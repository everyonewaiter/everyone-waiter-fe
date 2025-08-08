import CreatePage from "@/app/(main)/create/_components/CreatePage";
import MainLayout from "../_components/MainLayout";

export default function Page() {
  return (
    <MainLayout>
      <div className="flex h-full w-full items-start justify-center bg-gray-700 md:items-center md:overflow-y-auto md:py-6 lg:overflow-y-visible lg:py-0">
        <CreatePage />
      </div>
    </MainLayout>
  );
}
