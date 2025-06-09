"use client";

/* eslint-disable react-hooks/exhaustive-deps */

import Alert from "@/components/common/Alert/Alert";
import Dropdown from "@/components/common/Dropdown";
import { Form } from "@/components/common/Form";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import useOverlay from "@/hooks/use-overlay";
import {
  sendAuthCodeInDevice,
  verifyPhoneInDevice,
} from "@/lib/api/device.api";
import phoneNumberPattern from "@/lib/formatting/formatPhoneNumber";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  phone: string;
  authNumber: string;
}

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

export default function AddDeviceStep1({ onNextStep }: IProps) {
  const INIT_TIME = 300;

  const form = useForm<FormValues>({
    mode: "onChange",
  });

  const [authTime, setAuthTime] = useState(INIT_TIME);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [disables, setDisables] = useState({
    requestAuthentication: true,
    requestNumCheck: true,
    goToNextStep: false,
  });
  const [stores, setStores] = useState<{ storeId: bigint; name: string }[]>();
  const [active, setActive] = useState("매장을 선택해주세요.");

  const { mutate: verifyPhone } = useMutation({
    mutationFn: verifyPhoneInDevice,
  });

  const { mutate: sendAuth } = useMutation({
    mutationFn: sendAuthCodeInDevice,
  });

  useEffect(() => {
    if (!disables.requestNumCheck) {
      const timer = setInterval(() => {
        setAuthTime((prev) => {
          if (prev <= 1) {
            form.setValue("phone", "");
            form.setValue("authNumber", "");
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

    const phoneNumber = form.watch("phone").replaceAll("-", "");

    sendAuth(
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

    const phoneNumber = form.watch("phone").replaceAll("-", "");
    const code = Number(form.watch("authNumber"));

    verifyPhone(
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

  const handleNext = () => {
    const matchedStore = stores?.find((el) => el.name === active)!;

    if (!matchedStore) {
      handleOpenAlert();
    } else {
      const phoneNumber = form.watch("phone");
      onNextStep({ ...matchedStore, phoneNumber });
    }
  };

  return (
    <>
      <div className="w-full">
        <Form {...form}>
          <form className="relative flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>휴대폰 번호</Label>
              <div className="flex flex-row gap-3">
                <Input
                  {...form.register("phone")}
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                    const formatted = phoneNumberPattern(onlyNums);
                    form.setValue("phone", formatted);

                    setDisables((prev) => ({
                      ...prev,
                      requestAuthentication: false,
                    }));
                  }}
                  value={form.watch("phone")}
                  placeholder="사장님 계정에 등록된 전화번호를 입력해주세요."
                  className="cursor-pointer placeholder:text-gray-300"
                />
                <ResponsiveButton
                  type="button"
                  variant="default"
                  color="black"
                  responsiveButtons={{
                    sm: { buttonSize: "sm", className: "!w-[80px]" },
                    md: { buttonSize: "sm", className: "w-[94px]" },
                    lg: { buttonSize: "lg", className: "w-[120px]" },
                  }}
                  disabled={disables.requestAuthentication}
                  onClick={() => handleAuthentication()}
                >
                  {isSubmitted ? "재인증" : "인증요청"}
                </ResponsiveButton>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-3">
                <div className="relative w-full">
                  {isSubmitted && authTime && (
                    <div className="font-regular md:text-s absolute top-1/2 -translate-y-1/2 transform pt-1 text-right text-gray-200 transition-all duration-300 ease-in-out sm:right-25 sm:mt-[-2px] md:right-4 lg:text-[15px]">
                      {`${String(Math.floor(authTime / 60)).padStart(2, "0")}:${String(authTime % 60).padStart(2, "0")}`}
                    </div>
                  )}
                  <Input
                    {...form.register("authNumber")}
                    onChange={(e) => {
                      const { value } = e.target;
                      if (value.length <= 6) {
                        form.setValue("authNumber", value);
                      }
                    }}
                    value={form.watch("authNumber")}
                    placeholder="인증 번호를 입력해주세요."
                    className="cursor-pointer placeholder:text-gray-300"
                  />
                </div>
                <ResponsiveButton
                  type="button"
                  color="black"
                  disabled={disables.requestNumCheck}
                  onClick={handleCheckAuth}
                  responsiveButtons={{
                    sm: { buttonSize: "sm", className: "!px-[27px]" },
                    md: { buttonSize: "sm", className: "w-[94px]" },
                    lg: { buttonSize: "lg", className: "w-[120px]" },
                  }}
                >
                  확인
                </ResponsiveButton>
              </div>
            </div>
          </form>
        </Form>
      </div>
      {stores?.length! > 0 && (
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
        responsiveButtons={{
          sm: { buttonSize: "sm" },
          md: { buttonSize: "sm" },
          lg: { buttonSize: "lg" },
        }}
        commonClassName="mt-5 lg:mt-8 w-full"
        onClick={handleNext}
        disabled={!disables.goToNextStep}
      >
        다음
      </ResponsiveButton>
    </>
  );
}
