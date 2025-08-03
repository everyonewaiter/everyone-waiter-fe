import Navigation from "./Navigation";
import SidebarLogo from "./SidebarLogo";

interface IProps {
  initialStoreId: string;
}

export default function Sidebar({ initialStoreId }: IProps) {
  return (
    <aside className="hidden md:flex md:py-5 md:pr-3 md:pl-5 lg:py-8 lg:pl-[60px]">
      <div className="flex h-full flex-col rounded-[28px] bg-white px-3 pt-4 md:w-[186px] lg:w-[318px] lg:px-5 lg:pt-8">
        <SidebarLogo />
        <Navigation initialStoreId={initialStoreId} />
      </div>
    </aside>
  );
}
