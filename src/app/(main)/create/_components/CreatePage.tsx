"use client";

import Logo from "@/components/Logo";
import { Form } from "@/components/common/Form";
import useCheckLeave from "@/hooks/useCheckLeave";
import useCreateForm from "../_hooks/useCreateForm";
import CreateForm from "./CreateForm";

export default function CreatePage() {
  const { form, onSubmit, isSubmitted } = useCreateForm();

  useCheckLeave(form.formState.isDirty);

  return (
    <div className="flex w-full items-start justify-between rounded-[32px] bg-white p-8 md:w-[722px] lg:w-[888px]">
      <div className="hidden flex-col md:flex">
        <Logo
          width={90}
          height={90}
          className="md:h-[60px] md:w-[60px] lg:h-[90px] lg:w-[90px]"
        />
        <h1 className="text-gray-0 md:mt-5 md:text-xl md:font-semibold lg:mt-10 lg:text-4xl lg:font-bold">
          매장 등록
        </h1>
        <p className="font-regular text-gray-300 md:mt-2 md:text-xs lg:mt-3 lg:text-[15px]">
          첫 매장을 등록해볼까요?
          <br />
          간단한 정보만 입력하면 바로 시작할 수 있어요!
        </p>
      </div>
      <div className="flex w-[320px] flex-col items-start justify-start gap-[16px] lg:w-[400px]">
        <h1 className="text-gray-0 mb-8 flex w-full justify-center text-xl font-semibold md:hidden">
          매장 등록
        </h1>
        <Form {...form}>
          <CreateForm isSubmitted={isSubmitted} onSubmit={onSubmit} />
        </Form>
      </div>
    </div>
  );
}
