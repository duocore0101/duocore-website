import { createClient } from "./client";

export async function logActivity({ 
  action_type, 
  target_type, 
  target_name, 
  details = "" 
}: { 
  action_type: 'Created' | 'Edited' | 'Deleted', 
  target_type: string, 
  target_name: string,
  details?: string
}) {
  const supabase = createClient();
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Mapping emails to partner names for the activity log
    const emailToName: Record<string, string> = {
      'kishor.shelar@example.com': 'Kishor Shelar', // Placeholder - update as needed
      'saalim.khan@example.com': 'Saalim Khan',
      'aasim.khan@example.com': 'Aasim Khan',
      'duocore0101@gmail.com': 'Duocore Admin'
    };

    const adminName = user.user_metadata?.full_name || emailToName[user.email || ''] || user.email || 'Unknown Admin';

    await supabase.from('admin_activities').insert([{
      admin_name: adminName,
      action_type,
      target_type,
      target_name,
      details
    }]);
  } catch (e) {
    console.error("Failed to log activity:", e);
  }
}
