"use client";

import { Controller } from "react-hook-form";
import LabeledInput from "@/components/common/LabeledInput";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import Spinner from "@/components/common/Spinner";
import useOpenDaumPostcode from "@/hooks/useOpenDaumPostcode";
import Input from "@/components/common/Input";
import phoneNumberPattern from "@/lib/formatting/formatPhoneNumber";
import Label from "@/components/common/Label";
import formatBusinessNumber from "@/lib/formatting/formatBusinessNumber";
import { Form, FormErrorMessage } from "@/components/common/Form";
import cn from "@/lib/utils";
import useControlImage from "../_hooks/useControlImage";
import UploadPhoto from "../../(owner)/[id]/store/_components/UploadPhoto";
import useCreateForm from "../_hooks/useCreateForm";

interface IProps {
  storeId?: string;
}

export default function CreateForm({ storeId }: IProps) {
  const { form, isSubmitting, handleSubmit } = useCreateForm(storeId!);
  const { imageUrl, handleFile, fileRef } = useControlImage();
  const { handleOpenAddress } = useOpenDaumPostcode(form);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex w-[320px] flex-col gap-4 md:w-[348px] lg:w-[400px]"
      >
        <LabeledInput
          form={form}
          name="name"
          label="상호명"
          placeholder="상호명을 입력해주세요. (20자 이내)"
          readOnly={isSubmitting}
        />
        <LabeledInput
          form={form}
          name="ceoName"
          label="대표자명"
          placeholder="대표자명 입력해주세요."
          readOnly={isSubmitting}
        />
        <LabeledInput
          form={form}
          name="address"
          label="소재지"
          placeholder="소재지를 선택해주세요."
          className="cursor-pointer focus:border-2 focus:border-blue-500 focus:pl-[15px]"
          readOnly
          onClick={() => (isSubmitting ? null : handleOpenAddress())}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || (e.key === " " && !isSubmitting)) {
              e.preventDefault();
              handleOpenAddress();
            }
          }}
        />
        <LabeledInput
          form={form}
          name="detailAddress"
          label="상세 주소"
          placeholder="상세 주소를 입력해주세요."
          readOnly={isSubmitting}
        />
        <div className="flex flex-col gap-2">
          <Label>매장 전화번호</Label>
          <Controller
            name="landline"
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="전화번호를 입력해주세요."
                onChange={(e) =>
                  form.setValue("landline", phoneNumberPattern(e.target.value))
                }
                hasError={!!form.formState.errors.landline}
                readOnly={isSubmitting}
              />
            )}
          />
          <FormErrorMessage>
            {form.formState.errors.landline?.message?.toString()}
          </FormErrorMessage>
        </div>
        <div className="flex flex-col gap-2">
          <Label>사업자 번호</Label>
          <Controller
            name="license"
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="사업자 번호를 입력해주세요."
                onChange={(e) =>
                  form.setValue("license", formatBusinessNumber(e.target.value))
                }
                hasError={!!form.formState.errors.license}
                readOnly={isSubmitting}
              />
            )}
          />
          <FormErrorMessage>
            {form.formState.errors.license?.message?.toString()}
          </FormErrorMessage>
        </div>
        <div className="flex flex-col gap-2">
          <UploadPhoto
            ref={fileRef}
            handleFile={(value) =>
              handleFile(value, (v) => form.setValue("image", v))
            }
            image={imageUrl ?? ""}
            imageFile={form.watch("image")}
            className={cn(
              "h-[140px] max-w-full md:h-40 md:w-[348px] lg:w-100",
              form.formState.errors.image ? "border-primary" : ""
            )}
          />
          <FormErrorMessage>
            {form.formState.errors.image?.message?.toString()}
          </FormErrorMessage>
        </div>
        <ResponsiveButton
          type="submit"
          responsiveButtons={{
            lg: { buttonSize: "lg" },
            md: { buttonSize: "sm" },
            sm: { buttonSize: "sm", className: "!h-10" },
          }}
          disabled={isSubmitting}
          commonClassName="mt-4"
        >
          {isSubmitting ? <Spinner /> : "신청하기"}
        </ResponsiveButton>
      </form>
    </Form>
  );
}
