"use client";

/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import dynamic from "next/dynamic";
import { useState } from "react";
import { Plus } from "@/components/common/Icon/index";
import QueryProviders from "@/app/query-providers";
import Paginations from "@/components/common/Pagination/Paginations";
import useOverlay from "@/hooks/useOverlay";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [currentPage, setCurrentPage] = useState(1);

  const { data } = storesQueries.useRegistrationList(currentPage);

  const { open, close } = useOverlay();

  const handleOpenModal = (item: StoreDetail) => {
    if (["REJECT", "APPROVE"].includes(item.status)) {
      open(() => (
        <QueryProviders>
          <StoreApplicationModal
            close={close}
            isAccepted={item.status === "APPROVE"}
            storeId={storeId}
            {...item}
          />
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

  function AddButton() {
    return (
      <div className="z-10 hidden w-full justify-end md:flex">
        <Link href={pathname.startsWith("/main") ? "/main/create" : "/create"}>
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
    );
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex w-full flex-1 flex-col">
        {!pathname.startsWith("/main") && <AddButton />}
        {isMobile ? (
          <div className="flex flex-col gap-4">
            {data?.content.map((item, index) => (
              <MobileTables
                key={item.registrationId}
                onClick={handleOpenModal}
                tableNo={index + 1}
                {...item}
              />
            ))}
          </div>
        ) : (
          <Tables data={data?.content} onOpenModal={handleOpenModal} />
        )}
        {pathname.startsWith("/main") && <AddButton />}
      </div>
      {!pathname.startsWith("/main") && (
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
      )}
    </div>
  );
}
