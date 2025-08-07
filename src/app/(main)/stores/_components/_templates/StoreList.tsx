"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import dynamic from "next/dynamic";
import { useState } from "react";
import { Plus } from "@/components/common/Icon/index";
import QueryProviders from "@/app/query-providers";
import Paginations from "@/components/common/Pagination/Paginations";
import useOverlay from "@/hooks/useOverlay";
import { StoreProvider } from "@/providers/storeProvider";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { storesQueries } from "../../../(owner)/[id]/store/_queries/useStores";
import Tables from "../Tables";
import MobileTables from "../MobileTables";

const PendingAcceptModal = dynamic(
  () =>
    import("../../../(owner)/[id]/store/_components/modals/PendingAcceptModal"),
  {
    ssr: false,
  }
);

const StoreApplicationModal = dynamic(
  () =>
    import(
      "../../../(owner)/[id]/store/_components/modals/StoreApplicationModal"
    ),
  {
    ssr: false,
  }
);

interface IProps {
  storeId: string;
}

export default function StoreList({ storeId }: IProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [currentPage, setCurrentPage] = useState(1);

  const { data } = storesQueries.useRegistrationList(currentPage);

  const { open, close } = useOverlay();

  const handleOpenModal = (item: StoreDetail) => {
    if (["REJECT", "APPROVE"].includes(item.status)) {
      open(() => (
        <QueryProviders>
          <StoreProvider storeId={storeId}>
            <StoreApplicationModal
              close={close}
              isAccepted={item.status === "APPROVE"}
              {...item}
            />
          </StoreProvider>
        </QueryProviders>
      ));
    } else if (item.status === "APPLY") {
      open(() => (
        <QueryProviders>
          <PendingAcceptModal close={close} />
        </QueryProviders>
      ));
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex w-full flex-1 flex-col pt-8">
        <div className="z-10 hidden w-full justify-end md:flex">
          <Link href="/create">
            <ResponsiveButton
              variant="outline"
              color="primary"
              responsiveButtons={{
                lg: { buttonSize: "lg" },
                md: { buttonSize: "sm" },
                sm: { buttonSize: "sm" },
              }}
            >
              <div className="flex flex-row items-center lg:gap-[6px]">
                <Plus className="fill-primary h-4 w-4" />
                <span>매장 추가</span>
              </div>
            </ResponsiveButton>
          </Link>
        </div>
        {isMobile ? (
          data?.content.map((item, index) => (
            <MobileTables
              key={item.registrationId}
              onClick={handleOpenModal}
              tableNo={index + 1}
              {...item}
            />
          ))
        ) : (
          <Tables data={data?.content} onOpenModal={handleOpenModal} />
        )}
      </div>
      <Paginations
        size="lg:w-6 lg:h-6 md:w-5 md:h-5 hidden md:block"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        hasNext={data?.hasNext}
        hasPrevious={data?.hasPrevious}
        fastForwardTarget={data?.fastForwardPage}
        fastBackwardTarget={data?.fastBackwardPage}
        className="my-8"
      />
    </div>
  );
}
