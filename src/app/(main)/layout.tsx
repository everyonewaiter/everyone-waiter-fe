import Header from "@/components/common/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />
      <main>{children}</main>
    </div>
  );
}
