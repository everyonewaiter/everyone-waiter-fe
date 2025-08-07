"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function serverLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("permission");
  redirect("/login");
}
