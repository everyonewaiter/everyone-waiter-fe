// app/logout/page.tsx
import { serverLogout } from "@/lib/actions/logout";
import { redirect } from "next/navigation";

export default async function LogoutPage() {
  await serverLogout();
  redirect("/login");
}
