"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ModalWithTitle from "@/components/modal/largeModalLayout";
import { useStoreContext } from "@/providers/storeProvider";
import { Form } from "@/components/common/Form";
import Spinner from "@/components/common/Spinner";
import StoreApplyForm from "../StoreApplyForm";
import StepIndicator from "../StepIndicator";
import PhotoForBusiness from "./PhotoForBusiness";
import useStoreApplyForm from "../../_hooks/useStoreApplyForm";

interface IProps extends StoreDetail {
  close: () => void;
  isAccepted: boolean;
}

export default function StoreApplicationModal({
  close,
  isAccepted,
  ...item
}: IProps) {
  const navigate = useRouter();

  const { storeId } = useStoreContext();

  const [active, setActive] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPhotoUpdating, setIsPhotoUpdating] = useState(false);

  const { form, submit } = useStoreApplyForm(item, close);

  return (
    <ModalWithTitle onClose={close} title="매장 등록 신청 현황">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            submit(
              data,
              () => setIsSubmitted(true),
              () => navigate.push(`/${storeId}`)
            )
          )}
        >
          <ModalWithTitle.Layout>
            <div className="hidden w-full justify-center md:flex">
              <StepIndicator
                steps={["매장 정보 입력", "파일 첨부"]}
                onSetActive={setActive}
                isActive={active}
              />
            </div>
            <div className="mt-6 h-[340px] md:mt-4 md:mb-6 md:h-[292px] lg:mt-5 lg:h-[454px] lg:overflow-y-scroll">
              {active === 0 && (
                <StoreApplyForm
                  isUpdating={isUpdating}
                  isAccepted={isAccepted}
                />
              )}
              <PhotoForBusiness
                isUpdating={isUpdating}
                isPhotoUpdating={isPhotoUpdating}
                onResetPhoto={() => setIsPhotoUpdating(true)}
                imageUrl={item.image}
              />
            </div>
          </ModalWithTitle.Layout>
          <div className="w-full bg-red-50">
            {!isAccepted && (
              <ModalWithTitle.Button
                type={isUpdating ? "submit" : "button"}
                color={isUpdating ? "primary" : "black"}
                onClick={() => (isUpdating ? null : setIsUpdating(true))}
                disabled={isSubmitted}
              >
                {isUpdating && !isSubmitted && "재신청하기"}
                {!isUpdating && !isSubmitted && "수정하고 재신청하기"}
                {isSubmitted && <Spinner />}
              </ModalWithTitle.Button>
            )}
          </div>
        </form>
      </Form>
    </ModalWithTitle>
  );
}
