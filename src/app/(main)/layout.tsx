import MobileHeader from "@/app/(main)/_components/MobileHeader";
import Sidebar from "@/app/(main)/_components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen flex-col bg-white md:flex-row md:bg-[#F5F5F5]">
      <Sidebar />
      <MobileHeader />
      <main className="flex-1 rounded-[20px] md:mx-8 md:my-8 md:bg-white">
        {children}
      </main>
    </div>
  );
}
