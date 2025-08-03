import PAGE_TITLES from "@/constants/pageTitles";

export function getPageTitle(pathname: string, permission?: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (permission === "OWNER") {
    const ownerTitles = PAGE_TITLES.OWNER;
    return (
      ownerTitles[segments[1] as keyof typeof ownerTitles] ?? ownerTitles.init
    );
  }

  if (permission === "ADMIN") {
    const adminTitles = PAGE_TITLES.ADMIN;
    return adminTitles[segments[1] as keyof typeof adminTitles] ?? "관리자";
  }

  return "모두의 웨이터";
}
