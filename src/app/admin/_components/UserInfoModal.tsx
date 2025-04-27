"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import Dropdown from "@/components/common/Dropdown";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import LabeledInput from "@/components/common/LabeledInput";
import ResponsiveButton from "@/components/common/ResponsiveButton";
import ModalWithTitle from "@/components/modal/largeModalLayout";
import { PermissionObj, stateObj } from "@/constants/permissionObj";
import useAdmin from "@/hooks/useAdmin";
import EditIcon from "@public/icons/edit-contained.svg";
import { QueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface TypeActive {
  permission: TPermission | "";
  status: TStatus | "";
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
  const [isEditing, setIsEditing] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [active, setActive] = useState<TypeActive>({
    permission: "",
    status: "",
  });

  const { detailAccount, mutateUpdateDetail } = useAdmin();
  const { data } = detailAccount(accountId);

  const form = useForm<TypeForm | TypeEditForm>({
    mode: "onChange",
  });

  const handleDate = (value: string) => {
    const [date, time] = value.split(" ");
    return [date.slice(2), time.slice(0, 5)].join(" ");
  };

  useEffect(() => {
    if (data?.accountId) {
      form.setValue("email", data.email);
      form.setValue("date", handleDate(data.createdAt));
      setActive({
        permission: PermissionObj[
          data.permission as keyof typeof PermissionObj
        ] as TPermission,
        status: stateObj[data.state as keyof typeof stateObj] as TStatus,
      });
    }
  }, [data]);

  const submitHandler = () => {
    setIsDisabled(true);
    mutateUpdateDetail(
      {
        accountId,
        permission: active.permission as TPermission,
        state: active.status as TStatus,
      },
      {
        onSuccess: () => {
          const queryClient = new QueryClient();
          queryClient.invalidateQueries({ queryKey: ["get-account"] });
          close();
        },
      }
    );
  };

  return (
    <ModalWithTitle
      onClose={close}
      title="회원 정보"
      topRightComponent={
        isEditing ? (
          <ResponsiveButton
            type="submit"
            variant="outline"
            color="outline-primary"
            responsiveButtons={{
              lg: { buttonSize: "sm" },
            }}
          >
            편집 완료
          </ResponsiveButton>
        ) : (
          <button
            type="button"
            className="flex items-center gap-1"
            onClick={() => setIsEditing(true)}
          >
            <EditIcon width="20" height="20" className="text-gray-300" />
            <span className="text-sm font-medium text-gray-300">편집</span>
          </button>
        )
      }
      preventOutsideClose
    >
      <ModalWithTitle.Layout className="mt-6 !h-[450px]">
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
              {isEditing ? (
                <div className="flex flex-col gap-4">
                  <div className="flex w-full flex-col gap-2">
                    <Label>권한</Label>
                    <Dropdown
                      data={["사용자", "사장님", "관리자"]}
                      defaultText={data?.permission}
                      setActive={(value) =>
                        setActive((prev) => ({
                          ...prev,
                          permission: value as TPermission,
                        }))
                      }
                      active={active.permission}
                      triggerClassName="!w-full !flex justify-between !pl-4 !pr-3 !h-12 rounded-[12px] !text-sm"
                      className="!mr-3 !w-[477px]"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <Label disabled>구독 상태</Label>
                    <Input value="스타터" disabled />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <Label>상태</Label>
                    <Dropdown
                      data={["활성화", "비활성화"]}
                      defaultText={data?.state}
                      setActive={(value) =>
                        setActive((prev: TypeActive) => ({
                          ...prev,
                          status: value as TStatus,
                        }))
                      }
                      active={active.status}
                      triggerClassName="!w-full !flex justify-between !pl-4 !pr-3 !h-12 rounded-[12px] !text-sm"
                      className="!mr-3 !w-[477px]"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex w-full flex-col gap-2">
                    <Label disabled>권한</Label>
                    <Input
                      value={
                        PermissionObj[data?.permission as TPermission] || ""
                      }
                      disabled
                    />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <Label disabled>구독 상태</Label>
                    <Input value="스타터" disabled />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <Label disabled>상태</Label>
                    <Input value={stateObj[data?.state as TStatus]} disabled />
                  </div>
                </div>
              )}
            </div>
          </form>
        </FormProvider>
      </ModalWithTitle.Layout>
      <ResponsiveButton
        type="button"
        color="black"
        responsiveButtons={{
          sm: { buttonSize: "sm" },
          md: { buttonSize: "sm" },
          lg: { buttonSize: "lg" },
        }}
        disabled={isDisabled}
        commonClassName="w-full mt-8"
        onClick={close}
      >
        확인
      </ResponsiveButton>
    </ModalWithTitle>
  );
}
