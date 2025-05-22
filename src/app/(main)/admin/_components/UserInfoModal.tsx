"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import Dropdown from "@/components/common/Dropdown";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import LabeledInput from "@/components/common/LabeledInput";
import ResponsiveButton from "@/components/common/ResponsiveButton";
import ModalWithTitle from "@/components/modal/largeModalLayout";
import { PermissionObj, stateObj } from "@/constants/permissionObj";
import transformDate from "@/lib/formatting/transformDate";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useAdmin from "../_hooks/useAdmin";

interface TypeActive {
  permission: Permission | "";
  status: Status | "";
}

interface TypeForm {
  email: string;
  date: string;
}

interface TypeEditForm {
  email: string;
  date: string;
  permission: string;
  status: string;
}

interface IProps {
  close: () => void;
  accountId: bigint;
}

export default function UserInfoModal({ close, accountId }: IProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [active, setActive] = useState<TypeActive>({
    permission: "",
    status: "",
  });

  const queryClient = useQueryClient();
  const { detailAccountQuery, mutateUpdateDetail } = useAdmin();
  const { data: accountData, refetch } = detailAccountQuery(accountId);

  const form = useForm<TypeForm | TypeEditForm>({
    mode: "onChange",
  });

  useEffect(() => {
    if (accountData?.accountId) {
      form.setValue("email", accountData.email);
      form.setValue("date", transformDate(accountData.createdAt));
      setActive({
        permission: PermissionObj[
          accountData.permission as keyof typeof PermissionObj
        ] as Permission,
        status: stateObj[accountData.state as keyof typeof stateObj] as Status,
      });
    }
  }, [accountData]);

  const findKeyByValue = (obj: Record<string, string>, value: string) =>
    Object.keys(obj).find((key) => obj[key] === value);

  const submitHandler = () => {
    setIsDisabled(true);

    mutateUpdateDetail(
      {
        accountId,
        permission: findKeyByValue(
          PermissionObj,
          active.permission
        ) as Permission,
        state: findKeyByValue(stateObj, active.status) as Status,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["get-account"] });
          close();
          refetch();
        },
        onError: () => setIsDisabled(false),
      }
    );
  };

  return (
    <ModalWithTitle onClose={close} title="회원 정보" preventOutsideClose>
      <ModalWithTitle.Layout className="mt-6 !h-[300px] md:!h-[360px] lg:!h-[450px]">
        <FormProvider {...form}>
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
                labelDisabled
              />
              <LabeledInput
                form={form}
                name="date"
                label="가입 일시"
                placeholder="가입 일시"
                disabled
                labelDisabled
              />
              <div className="flex flex-col gap-4">
                <div className="relative flex w-full flex-col gap-2">
                  <Label>권한</Label>
                  <Dropdown
                    disabled={isDisabled}
                    data={["사용자", "사장님", "관리자"]}
                    defaultText={
                      PermissionObj[
                        accountData?.permission as keyof typeof PermissionObj
                      ]
                    }
                    setActive={(value) =>
                      setActive((prev) => ({
                        ...prev,
                        permission: value as Permission,
                      }))
                    }
                    active={active.permission}
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
                    disabled={isDisabled}
                    data={["활성화", "비활성화"]}
                    defaultText={
                      stateObj[accountData?.state as keyof typeof stateObj]
                    }
                    setActive={(value) =>
                      setActive((prev: TypeActive) => ({
                        ...prev,
                        status: value as Status,
                      }))
                    }
                    active={active?.status}
                    triggerClassName="!w-full !flex justify-between pl-3 lg:!pl-4 !pr-3 h-9 lg:!h-12 lg:rounded-[12px] rounded-[10px] text-s lg:!text-sm"
                    className="w-[280px] md:w-[324px] lg:w-[480px]"
                  />
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </ModalWithTitle.Layout>
      <div className="mt-8 flex w-full flex-row items-center justify-between gap-3">
        <ResponsiveButton
          type="button"
          color="grey"
          responsiveButtons={{
            sm: { buttonSize: "sm" },
            md: { buttonSize: "sm" },
            lg: { buttonSize: "lg" },
          }}
          commonClassName="w-[90px] md:w-[105px] lg:w-30"
          onClick={close}
        >
          취소
        </ResponsiveButton>
        <ResponsiveButton
          type="submit"
          color="black"
          responsiveButtons={{
            sm: { buttonSize: "sm" },
            md: { buttonSize: "sm" },
            lg: { buttonSize: "lg" },
          }}
          disabled={isDisabled}
          commonClassName="w-full"
        >
          변경 내용 저장하기
        </ResponsiveButton>
      </div>
    </ModalWithTitle>
  );
}
