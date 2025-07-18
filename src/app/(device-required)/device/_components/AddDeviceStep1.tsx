"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import Dropdown from "@/components/common/Dropdown";
import { Form } from "@/components/common/Form";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import useOverlay from "@/hooks/use-overlay";
import { deviceQueries } from "../_queries/useDeviceInfo";
import useStep1Form from "../_hooks/useStep1Form";
import PhoneInput from "./PhoneInput";
import AuthInput from "./AuthInput";

const Alert = dynamic(() => import("@/components/common/Alert/Alert"), {
  ssr: false,
});

interface IProps {
  onNextStep: ({
    storeId,
    name,
    phoneNumber,
  }: {
    storeId: bigint;
    name: string;
    phoneNumber: string;
  }) => void;
}

const INIT_TIME = 300;

export default function AddDeviceStep1({ onNextStep }: IProps) {
  const {
    form: { form, setValue, watch },
  } = useStep1Form();

  const [authTime, setAuthTime] = useState(INIT_TIME);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [disables, setDisables] = useState({
    requestAuthentication: true,
    requestNumCheck: true,
    goToNextStep: false,
  });
  const [stores, setStores] = useState<{ storeId: bigint; name: string }[]>();
  const [active, setActive] = useState("매장을 선택해주세요.");

  const { useSendAuth, useVerifyPhone } = deviceQueries;
  const { mutate: send } = useSendAuth();
  const { mutate: verify } = useVerifyPhone();

  useEffect(() => {
    if (!disables.requestNumCheck) {
      const timer = setInterval(() => {
        setAuthTime((prev) => {
          if (prev <= 1) {
            setValue("phone", "");
            setValue("authNumber", "");
            setIsSubmitted(false);
            setDisables({ ...disables, requestNumCheck: false });
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }

    return () => {};
  }, [disables.requestNumCheck]);

  const { open, close } = useOverlay();

  const handleOpenAlert = () => {
    open(() => (
      <Alert onAction={close} onClose={close} buttonText="확인" hasNoCancel>
        <span>등록된 매장이 없습니다.</span>
        <br />
        <span>매장을 먼저 등록해주세요!</span>
      </Alert>
    ));
  };

  // NOTE - 인증 요청
  const handleAuthentication = () => {
    setIsSubmitted(true);
    setDisables((prev) => ({ ...prev, requestNumCheck: false }));
    setAuthTime(INIT_TIME);

    const phoneNumber = watch("phone").replaceAll("-", "");

    send(
      { phoneNumber },
      {
        onError: (e) => {
          form.setError("phone", e);
        },
      }
    );
  };

  // NOTE - 인증 확인
  const handleCheckAuth = () => {
    setDisables({
      ...disables,
      requestAuthentication: true,
      requestNumCheck: true,
    });

    const phoneNumber = watch("phone").replaceAll("-", "");
    const code = Number(watch("authNumber"));

    verify(
      { phoneNumber, code },
      {
        onSuccess: (data) => {
          if (!data || data.stores.length === 0) {
            handleOpenAlert();
            form.reset();
            setIsSubmitted(false);
            setDisables((prev) => ({ ...prev, requestNumCheck: true }));
          } else {
            setStores(data.stores);
            if (data.stores.length === 1) setActive(data.stores[0].name);
            setDisables({
              requestAuthentication: true,
              requestNumCheck: true,
              goToNextStep: true,
            });
            setIsSubmitted(false);
            setAuthTime(0);
          }
        },
        onError: () => {
          setDisables({
            ...disables,
            requestNumCheck: false,
            goToNextStep: true,
          });
          setIsSubmitted(true);
        },
      }
    );
  };

  const handleSubmit = () => {
    const matchedStore = stores?.find((el) => el.name === active)!;

    if (!matchedStore) {
      handleOpenAlert();
    } else {
      const phoneNumber = watch("phone");
      onNextStep({ ...matchedStore, phoneNumber });
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="relative flex flex-col gap-4">
            <PhoneInput
              control={form.control}
              onClick={handleAuthentication}
              disabled={disables.requestAuthentication}
              isSubmitted={isSubmitted}
            />
            <AuthInput
              control={form.control}
              onClick={handleCheckAuth}
              authTime={authTime}
              isSubmitted={isSubmitted}
              disabled={disables.requestNumCheck}
            />
          </div>

          {!!stores?.length && (
            <div className="mt-4">
              {stores?.length === 1 && (
                <div className="flex flex-col gap-2">
                  <Label disabled>매장 선택</Label>
                  <Input value={stores[0].name} disabled />
                </div>
              )}
              {stores?.length! > 1 && (
                <div className="flex w-full flex-col gap-2">
                  <Label disabled>매장 선택</Label>
                  <Dropdown
                    data={stores?.map((el) => el.name)!}
                    defaultText="매장을 선택해주세요."
                    active={active}
                    setActive={setActive}
                    triggerClassName="!h-9 lg:!h-12 rounded-[8px] lg:rounded-[12px] w-full"
                    className="w-70 md:!w-[324px] lg:!w-120"
                  />
                </div>
              )}
            </div>
          )}
          <ResponsiveButton
            type="submit"
            responsiveButtons={{
              sm: { buttonSize: "sm" },
              md: { buttonSize: "sm" },
              lg: { buttonSize: "lg" },
            }}
            commonClassName="mt-5 lg:mt-8 w-full"
            disabled={!disables.goToNextStep}
          >
            다음
          </ResponsiveButton>
        </form>
      </Form>
    </div>
  );
}
