"use client";

import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { Plus } from "lucide-react";
import { useStoreContext } from "@/providers/storeProvider";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { Form } from "@/components/common/Form";
import Icon from "@/components/common/Icon";
import Label from "@/components/common/Label";
import LabeledInput from "@/components/common/LabeledInput";
import Spinner from "@/components/common/Spinner";
import { storesQueries } from "../_queries/useStores";
import Origins from "./Origins";
import useStoreForm from "../_hooks/useStoreForm";

export default function FormComponent() {
  const { storeId } = useStoreContext();

  const [makeDisabled, setMakeDisabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { data } = storesQueries.useStoresDetail(storeId);
  const updateInfo = storesQueries.useUpdateInfo();

  const { form, fields, isSubmitted, submitHandler, appendOrigin } =
    useStoreForm(data!, storeId);

  const handleSubmit = () => {
    submitHandler(updateInfo, () => {
      setMakeDisabled(true);
      setIsEditing(false);
    });
  };

  return (
    <div className="my-8 flex flex-col md:my-6 lg:my-10">
      <Form {...form}>
        <form
          className="flex flex-col gap-3 lg:gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <LabeledInput form={form} label="상호명" name="name" disabled />
          <LabeledInput
            form={form}
            label="사업자 번호"
            name="license"
            disabled
          />
          <LabeledInput form={form} label="주소" name="address" disabled />
          <Label>원산지</Label>
          {isEditing || fields?.length > 0 ? (
            <FormProvider {...form}>
              <Origins isEditing={isEditing} />
            </FormProvider>
          ) : (
            <div className="flex w-full flex-col items-center justify-center rounded-[16px] border border-gray-600 bg-gray-700 md:h-35 md:gap-1 md:p-6">
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
                  sm: { buttonSize: "sm" },
                  md: {
                    buttonSize: "sm",
                    className: "md-4 flex",
                  },
                  lg: { buttonSize: "lg", className: "!h-10" },
                }}
                disabled={makeDisabled}
                commonClassName="border-dashed mt-3"
                onClick={appendOrigin}
              >
                <Plus className="h-5 w-5 text-gray-400" />
              </ResponsiveButton>
              <ResponsiveButton
                type="submit"
                responsiveButtons={{
                  sm: {
                    buttonSize: "sm",
                    className: "flex mt-6 !h-[34px] !gap-2 items-center",
                  },
                  md: {
                    buttonSize: "sm",
                    className: "!h-[34px] flex items-center !gap-1",
                  },
                  lg: {
                    buttonSize: "lg",
                    className: "mt-8",
                  },
                }}
                disabled={isSubmitted}
              >
                {isSubmitted ? <Spinner /> : "저장하기"}
              </ResponsiveButton>
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
              className: "mt-6 !h-[34px] !gap-2 items-center",
            },
            md: {
              buttonSize: "sm",
              className: "!h-[34px] flex items-center !gap-1 mt-6",
            },
            lg: {
              buttonSize: "lg",
              className: "mt-8 !font-medium border-gray-0",
            },
          }}
          onClick={isEditing ? undefined : () => setIsEditing(true)}
        >
          <Icon iconKey="edit" size={20} className="text-gray-0" />
          <span>수정하기</span>
        </ResponsiveButton>
      )}
    </div>
  );
}
