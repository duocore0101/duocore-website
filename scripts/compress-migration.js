const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const BUCKET_NAME = 'portfolio-assets';

function getExtension(mimeType) {
  switch (mimeType) {
    case 'image/jpeg': return 'jpg';
    case 'image/png': return 'png';
    case 'image/webp': return 'webp';
    case 'image/gif': return 'gif';
    default: return 'bin';
  }
}

async function uploadBase64(base64Str, path) {
  if (!base64Str.startsWith('data:image')) {
    return base64Str; // Already a URL or generic string
  }

  const matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    return base64Str;
  }

  const mimeType = matches[1];
  const base64Data = matches[2];
  const buffer = Buffer.from(base64Data, 'base64');
  const ext = getExtension(mimeType);
  const fullPath = `${path}.${ext}`;

  console.log(`Uploading ${fullPath} (${(buffer.length / 1024).toFixed(2)} KB)...`);

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fullPath, buffer, {
      contentType: mimeType,
      upsert: true
    });

  if (error) {
    console.error(`Error uploading ${fullPath}:`, error.message);
    throw error;
  }

  const { data: publicUrlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fullPath);
  return publicUrlData.publicUrl;
}

async function runMigration() {
  console.log("Starting Storage Migration...");

  // 1. Migrate Projects
  console.log("Fetching projects...");
  const { data: projects, error: projectsError } = await supabase.from('projects').select('id, images');
  
  if (projectsError) {
    console.error("Failed to fetch projects:", projectsError);
    return;
  }

  for (const project of projects) {
    if (!project.images || project.images.length === 0) continue;
    
    let hasChanges = false;
    const newImages = [];

    for (let i = 0; i < project.images.length; i++) {
        const img = project.images[i];
        if (img.startsWith('data:image')) {
            try {
                const newUrl = await uploadBase64(img, `projects/${project.id}_${i}_${Date.now()}`);
                newImages.push(newUrl);
                hasChanges = true;
            } catch (err) {
                console.error("Skipping image chunk.");
                newImages.push(img);
            }
        } else {
            newImages.push(img);
        }
    }

    if (hasChanges) {
        console.log(`Updating project ${project.id} with new image URLs...`);
        const { error } = await supabase.from('projects').update({ images: newImages }).eq('id', project.id);
        if (error) console.error(`Error updating project ${project.id}:`, error);
    }
  }

  // 2. Migrate Reviews
  console.log("Fetching reviews...");
  const { data: reviews, error: reviewsError } = await supabase.from('project_reviews').select('id, image');

  if (reviewsError) {
    console.error("Failed to fetch reviews:", reviewsError);
    return;
  }

  for (const review of reviews) {
    if (!review.image || !review.image.startsWith('data:image')) continue;
    
    try {
        const newUrl = await uploadBase64(review.image, `reviews/${review.id}_${Date.now()}`);
        console.log(`Updating review ${review.id}...`);
        const { error } = await supabase.from('project_reviews').update({ image: newUrl }).eq('id', review.id);
        if (error) console.error(`Error updating review ${review.id}:`, error);
    } catch (err) {
        console.error("Skipping review chunk.");
    }
  }

  console.log("Migration completely finished!");
}

runMigration();
