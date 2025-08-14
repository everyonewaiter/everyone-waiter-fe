import getQueryClient from "@/app/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import FormComponent from "./_components/FormComponent";
import { storeKeys } from "./_queries/keys";
import { getStoreInfoDetail } from "./_api/stores.api";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const queryClient = getQueryClient();

  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: storeKeys.detail(id),
    queryFn: () => getStoreInfoDetail(id),
  });

  return (
    <div className="flex w-80 flex-col md:w-[480px]">
      <div className="">
        <div className="flex w-full flex-col items-center md:mt-6 lg:mt-10">
          <div className="w-full">
            <h1 className="text-gray-0 text-lg font-semibold lg:text-2xl">
              매장 정보
            </h1>
            <div className="md:text-s font-regular gap-1/2 mt-2 flex w-full flex-col text-xs text-gray-300 lg:mt-3 lg:text-sm">
              <span>등록된 매장 정보를 확인할 수 있습니다.</span>
              <span>변경된 정보가 있다면 언제든지 수정해 주세요.</span>
            </div>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <FormComponent storeId={id} />
            </HydrationBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}
