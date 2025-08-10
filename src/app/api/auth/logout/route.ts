import { deleteCookie } from "@/lib/cookies";
import { NextResponse } from "next/server";

export async function POST() {
  await deleteCookie("accessToken");
  await deleteCookie("refreshToken");
  await deleteCookie("permission");
  return NextResponse.json({ success: true });
}
