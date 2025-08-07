import { redirect } from "next/navigation";
import { getToken } from "@/lib/cookies";
import FirstLoading from "./(main)/_components/FirstLoading";
import ClientPage from "./_components/ClientPage";

export default async function Page() {
  const accessToken = await getToken("accessToken");
  const permission = await getToken("permission");

  if (!accessToken) redirect("/login");
  if (permission === "ADMIN") redirect("/admin/users");

  return (
    <>
      <FirstLoading />
      <ClientPage
        token={accessToken}
        permission={permission as AccountPermission}
      />
    </>
  );
}
