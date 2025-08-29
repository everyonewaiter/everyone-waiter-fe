import { getToken } from "@/lib/cookies";
import { redirect } from "next/navigation";
import FirstLoading from "./(main)/_components/FirstLoading";
import OwnerRedirectHandler from "./(main)/_components/OwnerRedirectHandler";

export default async function Page() {
  const accessToken = await getToken("accessToken");
  const permission = await getToken("permission");

  if (!accessToken || !permission) redirect("/login");

  if (permission === "ADMIN") redirect("/admin/users");
  if (permission === "USER") redirect("/main");

  if (permission === "OWNER") {
    return <OwnerRedirectHandler />;
  }

  return <FirstLoading />;
}
