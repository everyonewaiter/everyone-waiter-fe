"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Dropdown from "@/components/common/Dropdown";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import LabeledInput from "@/components/common/LabeledInput";
import { Form } from "@/components/common/Form";
import transformDate from "@/lib/formatting/transformDate";
import { permissionTranslate, stateTranslate } from "@/constants/translates";
import { ScrollArea } from "@/components/common/ScrollArea";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import SkeletonGroup from "@/components/common/Skeleton/SkeletonGroup";
import Spinner from "@/components/common/Spinner";
import { adminQueries } from "../../../_queries/useAdmin";

interface TypeForm {
  email: string;
  date: string;
  selectedPermission: AccountPermission | null;
  selectedStatus: Status | null;
}

interface TypeEditForm {
  email: string;
  date: string;
  permission: string;
  status: string;
}

export default function Page() {
  const params = useParams();
  const accountId = params?.userId as string;

  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data: accountData } = adminQueries.useAccountDetail(accountId);
  const updateDetail = adminQueries.useUpdateAccount();

  const form = useForm<TypeForm | TypeEditForm>({
    mode: "onChange",
  });

  useEffect(() => {
    if (accountData?.accountId) {
      form.reset({
        email: accountData.email,
        date: transformDate(accountData.createdAt),
        selectedPermission: accountData.permission,
        selectedStatus: accountData.state,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountData]);

  const findKeyByValue = (obj: Record<string, string>, value: string) =>
    Object.keys(obj).find((key) => obj[key] === value);

  const submitHandler = () => {
    setIsSubmitted(true);

    updateDetail.mutate(
      {
        accountId,
        permission: findKeyByValue(
          permissionTranslate,
          form.watch("selectedPermission")!
        ) as AccountPermission,
        state: findKeyByValue(
          stateTranslate,
          form.watch("selectedStatus")!
        ) as Status,
      },
      {
        onError: () => setIsSubmitted(false),
      }
    );
  };

  return (
    <div className="shrink-0">
      <div className="flex flex-col pb-6 text-lg font-semibold md:pb-5 lg:pb-8 lg:text-2xl">
        <span className="text-gray-0">회원 정보</span>
      </div>
      {accountData ? (
        <ScrollArea className="!h-[300px] md:!h-[360px] lg:!h-[450px]">
          <Form {...form}>
            <form
              className="flex flex-col"
              onSubmit={form.handleSubmit(submitHandler)}
            >
              <div className="flex flex-col gap-4">
                <LabeledInput
                  form={form}
                  name="email"
                  label="이메일"
                  placeholder="이메일"
                  disabled
                />
                <LabeledInput
                  form={form}
                  name="date"
                  label="가입 일시"
                  placeholder="가입 일시"
                  disabled
                />
                <div className="flex flex-col gap-4">
                  <div className="relative flex w-full flex-col gap-2">
                    <Label>권한</Label>
                    <Dropdown
                      disabled={isSubmitted}
                      data={["사용자", "사장님", "관리자"]}
                      defaultText={
                        permissionTranslate[
                          form.watch(
                            "selectedPermission"
                          ) as keyof typeof permissionTranslate
                        ]
                      }
                      setActive={(value) =>
                        form.setValue(
                          "selectedPermission",
                          value as AccountPermission
                        )
                      }
                      active={
                        permissionTranslate[
                          form.watch(
                            "selectedPermission"
                          ) as keyof typeof permissionTranslate
                        ] ?? "권한"
                      }
                      triggerClassName="!w-full !flex justify-between pl-3 lg:!pl-4 !pr-3 h-9 lg:!h-12 lg:rounded-[12px] rounded-[10px] text-s lg:!text-sm"
                      className="w-[280px] md:w-[324px] lg:w-[480px]"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <Label disabled>구독 상태</Label>
                    <Input value="스타터" disabled />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <Label>상태</Label>
                    <Dropdown
                      disabled={isSubmitted}
                      data={["활성화", "비활성화"]}
                      defaultText={
                        stateTranslate[
                          form.watch(
                            "selectedStatus"
                          ) as keyof typeof stateTranslate
                        ]
                      }
                      setActive={(value) =>
                        form.setValue("selectedStatus", value as Status)
                      }
                      active={
                        stateTranslate[
                          form.watch(
                            "selectedStatus"
                          ) as keyof typeof stateTranslate
                        ] ?? "상태"
                      }
                      triggerClassName="!w-full !flex justify-between pl-3 lg:!pl-4 !pr-3 h-9 lg:!h-12 lg:rounded-[12px] rounded-[10px] text-s lg:!text-sm"
                      className="w-[280px] md:w-[324px] lg:w-[480px]"
                    />
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </ScrollArea>
      ) : (
        <div className="flex !h-[300px] flex-col gap-3.5 md:!h-[360px] lg:!h-[450px]">
          <SkeletonGroup />
        </div>
      )}
      <div className="mt-8 flex w-full flex-row items-center justify-between gap-3">
        <ResponsiveButton
          type="submit"
          color="black"
          responsiveButtons={{
            sm: { buttonSize: "sm" },
            md: { buttonSize: "sm" },
            lg: { buttonSize: "lg" },
          }}
          disabled={isSubmitted}
          commonClassName="w-full"
        >
          {isSubmitted ? <Spinner /> : "변경 내용 저장하기"}
        </ResponsiveButton>
      </div>
    </div>
  );
}
