"use client";

import getQueryClient from "@/app/get-query-client";
import Dropdown from "@/components/common/Dropdown";
import { Form } from "@/components/common/Form";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import ModalWithTitle from "@/components/modal/largeModalLayout";
import getCdn from "@/utils/getCdn";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAdmin from "../_hooks/useAdmin";

const dataObj = {
  상호명: "name",
  사업자번호: "license",
  소재지: "address",
  신청일: "createdAt",
};

interface IProps {
  close: () => void;
  registrationId: bigint;
  email: string;
}

const REJECT_REASONS = [
  "사업자 정보를 조회할 수 없습니다.",
  "매장 정보가 기존 등록된 매장과 중복됩니다.",
  "영업 허가증이 확인되지 않아 승인이 어렵습니다.",
];

export default function StoreModal({ close, registrationId, email }: IProps) {
  const queryClient = getQueryClient();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [active, setActive] = useState(REJECT_REASONS[0]);

  const { detailStoreQuery, mutateRejectStore, mutateApproveStore } =
    useAdmin();
  const { data } = detailStoreQuery(registrationId);

  const form = useForm();

  const submitHandler = () => {};

  const handleClick = (type: "reject" | "approve") => {
    setIsSubmitted(true);

    if (type === "reject") {
      mutateRejectStore(
        { id: data?.registrationId!, reason: active },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["stores-to-approve"] });
            close();
          },
          onError: () => setIsSubmitted(false),
        }
      );
    } else if (type === "approve") {
      mutateApproveStore(data?.registrationId!, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["stores-to-approve"] });
          close();
        },
        onError: () => setIsSubmitted(false),
      });
    }
  };

  return (
    <ModalWithTitle
      onClose={close}
      title={
        <div className="flex flex-col text-2xl">
          <span className="text-primary">{email}</span>
          <span className="text-gray-0">매장 등록 신청</span>
        </div>
      }
      preventOutsideClose
    >
      <ModalWithTitle.Layout>
        {data ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)}>
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
                <div className="flex flex-col gap-2">
                  <Label>반려 사유 선택</Label>
                  <Dropdown
                    data={REJECT_REASONS}
                    defaultText=""
                    setActive={setActive}
                    active={active}
                    triggerClassName="!w-full rounded-[12px] !h-12 font-400"
                    className="!font-medium lg:w-[476px]"
                  />
                </div>
                <div className="mb-8 flex flex-col gap-2">
                  <Label>사업자 등록증</Label>
                  {data?.image && (
                    <div className="flex w-full justify-center rounded-[16px] border border-gray-600 py-6">
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
            </form>
          </Form>
        ) : (
          <div>데이터 가져오는 중...</div>
        )}
      </ModalWithTitle.Layout>
      <ModalWithTitle.ButtonGroup
        cancelBtn={{
          text: "반려하기",
          onClick: () => handleClick("reject"),
          disabled: isSubmitted,
        }}
        saveBtn={{
          text: "승인하기",
          onClick: () => handleClick("approve"),
          disabled: isSubmitted,
        }}
      />
    </ModalWithTitle>
  );
}
