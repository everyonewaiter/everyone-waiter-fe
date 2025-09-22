"use client";

/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import dynamic from "next/dynamic";
import { useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Plus } from "@/components/common/Icon/index";
import QueryProviders from "@/app/query-providers";
import Paginations from "@/components/common/Pagination/Paginations";
import useOverlay from "@/hooks/useOverlay";
import { getClientCookie } from "@/lib/cookies/client";
import Loading from "@/components/Loading";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
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
  const pathname = usePathname();
  const navigate = useRouter();
  const isMobile = useBetterMediaQuery({ query: "(max-width: 767px)" });
  const permission = getClientCookie("permission");

  const [currentPage, setCurrentPage] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

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
    } else if (item.status.endsWith("APPLY")) {
      open(() => (
        <QueryProviders>
          <PendingAcceptModal close={close} />
        </QueryProviders>
      ));
    }
  };

  function AddButton() {
    return (
      <div className="z-[9998] flex w-full justify-end">
        <ResponsiveButton
          variant="outline"
          color="primary"
          responsiveButtons={{
            lg: { buttonSize: "lg" },
            md: { buttonSize: "sm" },
            sm: { buttonSize: "sm", className: "mb-3" },
          }}
          onClick={() => {
            setIsLoading(true);
            startTransition(() => {
              setTimeout(() => {
                navigate.push(
                  permission === "USER"
                    ? "/main/create"
                    : `/create?storeId=${storeId}`
                );
              }, 200);
            });
          }}
        >
          <div className="flex flex-row items-center gap-1.5">
            <Plus className="fill-primary h-4 w-4" />
            <span>매장 추가</span>
          </div>
        </ResponsiveButton>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div
        className={`transition-opacity duration-300 ${isPending || isLoading ? "opacity-100" : "opacity-0"}`}
      >
        {(isPending || isLoading) && <Loading />}
      </div>

      <div className="flex w-full flex-1 flex-col">
        <AddButton />
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
      </div>
      {!pathname.startsWith("/main") && (
        <Paginations
          size="lg:w-6 lg:h-6 md:w-5 md:h-5 hidden md:block"
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          hasNext={!data?.isLast}
          hasPrevious={!data?.isFirst}
          fastForwardTarget={data?.fastForwardPage}
          fastBackwardTarget={data?.fastBackwardPage}
          className="my-8"
        />
      )}
    </div>
  );
}
