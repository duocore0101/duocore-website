"use server";

import { cookies } from "next/headers";

export async function loginStaff(mobile: string, password: string) {
  const staff1Name = process.env.STAFF1_NAME;
  const staff1Mobile = process.env.STAFF1_MOBILE;
  const staff1Pass = process.env.STAFF1_PASSWORD;
  
  const staff2Name = process.env.STAFF2_NAME;
  const staff2Mobile = process.env.STAFF2_MOBILE;
  const staff2Pass = process.env.STAFF2_PASSWORD;
  
  const staff3Name = process.env.STAFF3_NAME;
  const staff3Mobile = process.env.STAFF3_MOBILE;
  const staff3Pass = process.env.STAFF3_PASSWORD;

  const validStaff = [
    { id: "1", name: staff1Name, mobile: staff1Mobile, password: staff1Pass },
    { id: "2", name: staff2Name, mobile: staff2Mobile, password: staff2Pass },
    { id: "3", name: staff3Name, mobile: staff3Mobile, password: staff3Pass },
  ];

  const matchedStaff = validStaff.find(
    (staff) => staff.mobile === mobile && staff.password === password && staff.mobile && staff.password
  );

  if (matchedStaff) {
    // Set a dummy cookie to simulate authentication securely
    cookies().set({
      name: "staff_auth",
      value: "true",
      httpOnly: true,
      path: "/",
      maxAge: 86400,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    
    // Set the staff name in a non-httpOnly cookie so the client can potentially use it for UI
    cookies().set({
      name: "staff_name",
      value: matchedStaff.name || "Staff",
      path: "/",
      maxAge: 86400,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    
    // Set the staff ID
    cookies().set({
      name: "staff_id",
      value: matchedStaff.id,
      path: "/",
      maxAge: 86400,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return { success: true };
  }

  return { success: false, error: "Invalid mobile number or password." };
}
