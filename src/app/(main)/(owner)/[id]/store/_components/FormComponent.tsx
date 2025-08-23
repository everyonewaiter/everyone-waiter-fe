"use client";

import { useState } from "react";
import { Controller, FormProvider } from "react-hook-form";
import { Plus } from "@/components/common/Icon/index";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { Form, FormLabel } from "@/components/common/Form";
import Icon from "@/components/common/Icon/Icon";
import Label from "@/components/common/Label";
import LabeledInput from "@/components/common/LabeledInput";
import Spinner from "@/components/common/Spinner";
import useCheckLeave from "@/hooks/useCheckLeave";
import Input from "@/components/common/Input";
import phoneNumberPattern from "@/lib/formatting/formatPhoneNumber";
import { storesQueries } from "../_queries/useStores";
import Origins from "./Origins";
import useStoreForm from "../_hooks/useStoreForm";

interface IProps {
  storeId: string;
}

export default function FormComponent({ storeId }: IProps) {
  const [makeDisabled, setMakeDisabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const updateInfo = storesQueries.useUpdateInfo();

  const {
    form,
    fields,
    isSubmitted,
    submitHandler,
    appendOrigin,
    removeOrigin,
  } = useStoreForm(storeId);

  useCheckLeave(form.formState.isDirty);

  const handleSubmit = () => {
    submitHandler(updateInfo, () => {
      setMakeDisabled(true);
      setIsEditing(false);
    });
  };

  return (
    <div className="my-8 flex w-full flex-col md:my-6 lg:my-10">
      <Form {...form}>
        <form
          className="flex flex-col gap-3 md:gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <LabeledInput
            form={form}
            label="상호명"
            name="name"
            disabled
            placeholder="상호명"
          />
          <LabeledInput
            form={form}
            label="사업자 번호"
            name="license"
            disabled
            placeholder="사업자 번호"
          />
          <LabeledInput
            form={form}
            label="주소"
            name="address"
            disabled
            placeholder="주소"
          />
          <Controller
            name="landline"
            control={form.control}
            render={({ field }) => (
              <div className="flex flex-col gap-2">
                <FormLabel labelDisabled={!isEditing}>매장 전화번호</FormLabel>
                <Input
                  {...field}
                  placeholder="매장 전화번호"
                  onChange={(e) => {
                    const formatted = phoneNumberPattern(e.target.value);
                    form.setValue("landline", formatted, {
                      shouldDirty: true,
                    });
                  }}
                  disabled={!isEditing}
                  readOnly={isSubmitted}
                  hasError={!!form.formState.errors.landline}
                />
              </div>
            )}
          />
          <Label>원산지</Label>
          {isEditing || fields?.length > 0 ? (
            <FormProvider {...form}>
              <Origins
                isEditing={isEditing}
                fields={fields}
                removeOrigin={removeOrigin}
                isSubmitted={isSubmitted}
              />
            </FormProvider>
          ) : (
            <div className="flex h-[140px] w-full flex-col items-center justify-center rounded-[16px] border border-gray-600 bg-gray-700 md:h-auto md:gap-1 md:p-6">
              <span className="text-gray-0 text-sm font-medium">
                원산지가 등록되어 있지 않습니다.
              </span>
              <span className="text-s font-regular text-gray-300">
                등록을 하시려면 수정 버튼을 추가해주세요.
              </span>
            </div>
          )}
          {isEditing && (
            <>
              <ResponsiveButton
                type="button"
                variant="outline"
                color="gray"
                responsiveButtons={{
                  sm: {
                    buttonSize: "sm",
                    className: "mt-6 !h-[34px] !gap-2 items-center md:hidden",
                  },
                  md: {
                    buttonSize: "sm",
                    className:
                      "!h-[34px] hidden md:flex items-center !gap-1 mt-6",
                  },
                  lg: {
                    buttonSize: "lg",
                    className: "mt-8 !font-medium border-gray-0",
                  },
                }}
                disabled={makeDisabled}
                commonClassName="border-dashed mt-3"
                onClick={appendOrigin}
              >
                <Plus className="h-5 w-5 text-gray-400" />
              </ResponsiveButton>
              <div className="mt-6 flex items-center gap-2 md:mt-8">
                <ResponsiveButton
                  type="button"
                  variant="outline"
                  color="grey"
                  responsiveButtons={{
                    sm: {
                      buttonSize: "sm",
                      className: "!h-[34px] !gap-2 items-center",
                    },
                    md: {
                      buttonSize: "md",
                      className: "items-center !gap-1",
                    },
                    lg: {
                      buttonSize: "lg",
                      className: "!font-medium border-gray-0",
                    },
                  }}
                  disabled={isSubmitted}
                  onClick={() => setIsEditing(false)}
                >
                  수정 취소
                </ResponsiveButton>
                <ResponsiveButton
                  type="submit"
                  responsiveButtons={{
                    sm: {
                      buttonSize: "sm",
                      className: "!h-[34px] !gap-2 items-center",
                    },
                    md: {
                      buttonSize: "md",
                      className: "items-center !gap-1",
                    },
                    lg: {
                      buttonSize: "lg",
                      className: "!font-medium border-gray-0",
                    },
                  }}
                  commonClassName="w-full"
                  disabled={isSubmitted || !form.formState.isDirty}
                >
                  {isSubmitted ? <Spinner /> : "저장하기"}
                </ResponsiveButton>
              </div>
            </>
          )}
        </form>
      </Form>
      {!isEditing && (
        <ResponsiveButton
          type="button"
          variant="outline"
          color="black"
          responsiveButtons={{
            sm: {
              buttonSize: "sm",
              className: "mt-6 !h-[34px] !gap-2 items-center md:hidden",
            },
            md: {
              buttonSize: "md",
              className: "!h-10 hidden md:flex items-center !gap-1 mt-6",
            },
            lg: {
              buttonSize: "lg",
              className: "mt-7 !font-medium border-gray-0",
            },
          }}
          onClick={isEditing ? undefined : () => setIsEditing(true)}
          commonClassName="hover:!bg-white hover:!text-gray-0"
        >
          <Icon iconKey="edit" size={20} className="text-gray-0" />
          <span>수정하기</span>
        </ResponsiveButton>
      )}
    </div>
  );
}
