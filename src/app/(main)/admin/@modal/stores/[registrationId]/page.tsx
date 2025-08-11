"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Dropdown from "@/components/common/Dropdown";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { ScrollArea } from "@/components/common/ScrollArea";
import SkeletonGroup from "@/components/common/Skeleton/SkeletonGroup";
import { getCdn } from "@/utils/getCdn";
import { adminQueries } from "../../../_queries/useAdmin";

const dataObj = {
  상호명: "name",
  사업자번호: "license",
  소재지: "address",
  신청일: "createdAt",
};

const REJECT_REASONS = [
  "사업자 정보를 조회할 수 없습니다.",
  "매장 정보가 기존 등록된 매장과 중복됩니다.",
  "영업 허가증이 확인되지 않아 승인이 어렵습니다.",
];

export default function Page() {
  const navigate = useRouter();
  const params = useParams();
  const registrationId = params?.registrationId as string;
  const searchParams = useSearchParams();
  const email = searchParams.get("email") as string;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [active, setActive] = useState(REJECT_REASONS[0]);

  const { data } = adminQueries.useStoresDetail(registrationId);
  const rejectStore = adminQueries.useRejectStore();
  const approveStore = adminQueries.useApproveStore();

  const submitHandler = (type: "reject" | "approve") => {
    setIsSubmitted(true);

    if (type === "reject") {
      rejectStore.mutate(
        { id: String(data?.registrationId), reason: active },
        {
          onSuccess: () => navigate.push("/admin/stores"),
          onError: () => setIsSubmitted(false),
        }
      );
    } else {
      approveStore.mutate(
        { id: String(data?.registrationId) },
        {
          onSuccess: () => navigate.push("/admin/stores"),
          onError: () => setIsSubmitted(false),
        }
      );
    }
  };

  return (
    <div className="shrink-0">
      <div className="flex flex-col pb-6 text-lg font-semibold md:pb-5 md:text-base lg:pb-8 lg:text-2xl">
        <span className="text-primary">{email}</span>
        <span className="text-gray-0">매장 등록 신청</span>
      </div>
      <div>
        {data?.accountId ? (
          <ScrollArea className="h-[288px] md:h-[324px] lg:h-[488px]">
            <div className="flex flex-col gap-4">
              {Object.keys(dataObj).map((key) => (
                <div className="flex flex-col gap-2" key={key}>
                  <Label>{key}</Label>
                  <Input
                    value={
                      data?.[
                        dataObj[
                          key as keyof typeof dataObj
                        ] as keyof StoreDetail
                      ] as string
                    }
                    readOnly
                  />
                </div>
              ))}

              {data?.status !== "APPROVE" && (
                <div className="flex flex-col gap-2">
                  <Label>반려 사유 선택</Label>
                  <Dropdown
                    data={REJECT_REASONS}
                    defaultText=""
                    setActive={setActive}
                    active={active}
                    triggerClassName="h-9 rounded-[8px] md:h-9 md:pr-4 md:pl-4 md:text-[13px] lg:h-12 lg:rounded-[12px] lg:py-3 lg:pr-3 lg:pl-4 lg:text-sm lg:text-[15px] justify-between"
                  />
                </div>
              )}
              <div className="mb-8 flex flex-col gap-2">
                <Label>사업자 등록증</Label>
                {data?.image && (
                  <div className="flex w-full justify-center rounded-[16px] md:py-1 lg:py-6">
                    <Image
                      src={getCdn(data?.image)}
                      alt="사업자 등록증"
                      width={381}
                      height={458}
                      className="rounded-[16px] border border-gray-600 object-cover lg:h-[458px] lg:w-[381px]"
                    />
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
        ) : (
          <div className="flex h-[288px] flex-col gap-3.5 md:h-[324px] lg:h-[488px]">
            <SkeletonGroup />
          </div>
        )}
      </div>
      {(data?.status === "APPLY" || data?.status === "REAPPLY") && (
        <div className="flex flex-row items-center justify-between gap-2 pt-6 md:pt-5 lg:gap-3 lg:pt-8">
          <ResponsiveButton
            type="button"
            color="grey"
            responsiveButtons={{
              lg: {
                buttonSize: "xl",
                className: "!text-lg !font-semibold !h-14",
              },
              md: { buttonSize: "sm", className: "!h-9" },
              sm: { buttonSize: "sm", className: "!h-10" },
            }}
            commonClassName="w-full"
            onClick={() => submitHandler("reject")}
            disabled={isSubmitted}
          >
            반려하기
          </ResponsiveButton>
          <ResponsiveButton
            type="button"
            color="primary"
            responsiveButtons={{
              lg: {
                buttonSize: "xl",
                className: "!text-lg !font-semibold !h-14",
              },
              md: { buttonSize: "sm", className: "!h-10" },
              sm: { buttonSize: "sm", className: "!h-10" },
            }}
            commonClassName="w-full"
            onClick={() => submitHandler("approve")}
            disabled={isSubmitted}
          >
            승인하기
          </ResponsiveButton>
        </div>
      )}
    </div>
  );
}
