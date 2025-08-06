// app/logout/page.tsx
import { serverLogout } from "@/lib/actions/logout";
import { getToken } from "@/lib/cookies";
import { redirect } from "next/navigation";

export default async function LogoutPage() {
  const token = await getToken("accessToken");

  if (token) redirect("/");

  await serverLogout();
  redirect("/login");
}
