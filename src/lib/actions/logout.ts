// src/lib/serverLogout.ts

"use server";

import { cookies } from "next/headers";

export async function serverLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("role");
}
