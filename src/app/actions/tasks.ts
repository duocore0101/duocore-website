"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function getSupabaseClient() {
  const cookieStore = cookies();
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

export type Task = {
  id: string;
  staff_id: string;
  date: string;
  description: string;
  is_completed: boolean;
  created_at: string;
};

export async function getStaffList() {
  return [
    { id: "1", name: process.env.STAFF1_NAME || "Saalim" },
    { id: "2", name: process.env.STAFF2_NAME || "Aasim" },
    { id: "3", name: process.env.STAFF3_NAME || "Maheknaaz" },
  ];
}

export async function getTasks(date?: string) {
  const supabase = getSupabaseClient();
  
  let query = supabase.from("tasks").select("*").order("created_at", { ascending: true });
  
  if (date) {
    query = query.eq("date", date);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
  
  return data as Task[];
}

export async function createTask(staff_id: string, date: string, description: string) {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from("tasks")
    .insert([{ staff_id, date, description }])
    .select();
    
  if (error) {
    console.error("Error creating task:", error);
    return { success: false, error: error.message };
  }
  
  return { success: true, task: data[0] };
}

export async function toggleTaskCompletion(taskId: string, isCompleted: boolean) {
  const supabase = getSupabaseClient();
  
  const { error } = await supabase
    .from("tasks")
    .update({ is_completed: isCompleted })
    .eq("id", taskId);
    
  if (error) {
    console.error("Error updating task:", error);
    return { success: false, error: error.message };
  }
  
  return { success: true };
}

export async function updateTaskDescription(taskId: string, description: string) {
  const supabase = getSupabaseClient();
  
  const { error } = await supabase
    .from("tasks")
    .update({ description })
    .eq("id", taskId);
    
  if (error) {
    console.error("Error updating task description:", error);
    return { success: false, error: error.message };
  }
  
  return { success: true };
}

export async function deleteTask(taskId: string) {
  const supabase = getSupabaseClient();
  
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId);
    
  if (error) {
    console.error("Error deleting task:", error);
    return { success: false, error: error.message };
  }
  
  return { success: true };
}
