import { getToken } from "@/lib/cookies";
import { notFound, redirect } from "next/navigation";
import { getStoreList } from "./(main)/(owner)/[id]/store/_api/stores.api";
import FirstLoading from "./(main)/_components/FirstLoading";

export default async function Page() {
  const accessToken = await getToken("accessToken");
  const permission = await getToken("permission");

  if (!accessToken || !permission) redirect("/login");

  if (permission === "ADMIN") redirect("/admin/users");
  if (permission === "USER") redirect("/main");

  if (permission === "OWNER") {
    try {
      const { stores } = await getStoreList(accessToken);
      const firstStoreId = stores?.[0]?.storeId;
      if (firstStoreId) redirect(`/${firstStoreId}`);
      notFound();
    } catch {
      redirect("/main");
    }
  }

  notFound();

  return <FirstLoading />;
}
