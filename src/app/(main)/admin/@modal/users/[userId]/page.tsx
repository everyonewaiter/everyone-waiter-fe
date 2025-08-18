"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Dropdown from "@/components/common/Dropdown";
import Label from "@/components/common/Label";
import LabeledInput from "@/components/common/LabeledInput";
import { Form } from "@/components/common/Form";
import { permissionTranslate, stateTranslate } from "@/constants/translates";
import { ScrollArea } from "@/components/common/ScrollArea";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import SkeletonGroup from "@/components/common/Skeleton/SkeletonGroup";
import Spinner from "@/components/common/Spinner";
import Input from "@/components/common/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminQueries } from "../../../_queries/useAdmin";
import { TypeUserForm, userSchema } from "../../../users/_schema/user.schema";

export default function Page() {
  const navigate = useRouter();
  const params = useParams();
  const accountId = params?.userId as string;

  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data: accountData } = adminQueries.useAccountDetail(accountId);
  const updateDetail = adminQueries.useUpdateAccount();

  const form = useForm<TypeUserForm>({
    mode: "onChange",
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      permission: "USER",
      state: "INACTIVE",
      phoneNumber: "",
    },
  });

  const handlePhoneNumber = () => {
    const phone = accountData?.phoneNumber!;

    return `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7, 11)}`;
  };

  useEffect(() => {
    if (accountData?.accountId) {
      form.reset({
        ...accountData,
        phoneNumber: handlePhoneNumber(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountData]);

  const submitHandler = (data: TypeUserForm) => {
    setIsSubmitted(true);

    updateDetail.mutate(
      {
        accountId,
        permission: data.permission,
        state: data.state,
      },
      {
        onSuccess: () => navigate.back(),
        onError: () => setIsSubmitted(false),
      }
    );
  };

  return (
    <div className="shrink-0">
      <div className="flex flex-col pb-6 text-lg font-semibold md:pb-5 lg:pb-8 lg:text-2xl">
        <span className="text-gray-0">회원 정보</span>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col"
          onSubmit={form.handleSubmit(submitHandler)}
        >
          {accountData ? (
            <ScrollArea className="!h-[300px] md:!h-[360px] lg:!h-[450px]">
              <div className="flex flex-col gap-4">
                <LabeledInput
                  form={form}
                  name="email"
                  label="이메일"
                  placeholder="이메일"
                  disabled
                />
                <div className="flex flex-col gap-2">
                  <Label disabled>가입 일시</Label>
                  <Input disabled value={accountData?.createdAt} />
                </div>
                <LabeledInput
                  form={form}
                  name="phoneNumber"
                  label="휴대폰 번호"
                  placeholder="휴대폰 번호"
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
                            "permission"
                          ) as keyof typeof permissionTranslate
                        ]
                      }
                      setActive={(value) => {
                        let translated;
                        if (value === "사용자") {
                          translated = "USER";
                        } else if (value === "관리자") {
                          translated = "ADMIN";
                        } else {
                          translated = "OWNER";
                        }
                        form.setValue(
                          "permission",
                          translated as AccountPermission
                        );
                      }}
                      active={
                        permissionTranslate[
                          form.watch(
                            "permission"
                          ) as keyof typeof permissionTranslate
                        ] ?? "권한"
                      }
                      triggerClassName="!w-full !flex justify-between h-9 lg:!h-12 lg:rounded-[12px] rounded-[10px] text-s lg:!text-sm"
                    />
                  </div>
                  {/* <div className="flex w-full flex-col gap-2">
                    <Label disabled>구독 상태</Label>
                    <Input value="스타터" disabled />
                  </div> */}
                  <div className="flex w-full flex-col gap-2">
                    <Label>상태</Label>
                    <Dropdown
                      disabled={isSubmitted}
                      data={["활성화", "비활성화"]}
                      defaultText={
                        stateTranslate[
                          form.watch("state") as keyof typeof stateTranslate
                        ]
                      }
                      setActive={(value) => {
                        form.setValue(
                          "state",
                          value === "활성화" ? "ACTIVE" : "INACTIVE"
                        );
                      }}
                      active={
                        stateTranslate[
                          form.watch("state") as keyof typeof stateTranslate
                        ] ?? "상태"
                      }
                      triggerClassName="!w-full !flex justify-between pl-3 lg:!pl-4 !pr-3 h-9 lg:!h-12 lg:rounded-[12px] rounded-[10px] text-s lg:!text-sm"
                      className="w-[280px] md:w-[324px] lg:w-[480px]"
                    />
                  </div>
                </div>
              </div>
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
        </form>
      </Form>
    </div>
  );
}
