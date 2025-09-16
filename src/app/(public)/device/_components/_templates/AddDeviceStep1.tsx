"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Controller } from "react-hook-form";
import phoneNumberPattern from "@/lib/formatting/formatPhoneNumber";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { Form, FormErrorMessage } from "@/components/common/Form";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import useOverlay from "@/hooks/useOverlay";
import Spinner from "@/components/common/Spinner";
import useAuthReducer from "@/hooks/useAuthReducer";
import { Skeleton } from "@/components/common/Skeleton/Skeleton";
import { deviceQueries } from "../../_queries/useDeviceInfo";
import useStep1Form from "../../_hooks/useStep1Form";

const Alert = dynamic(() => import("@/components/common/Alert/Alert"), {
  ssr: false,
});

const Dropdown = dynamic(() => import("@/components/common/Dropdown"), {
  ssr: false,
  loading: () => <Spinner />,
});

interface IProps {
  onNextStep: (args: {
    storeId: string;
    name: string;
    phoneNumber: string;
  }) => void;
}

export default function AddDeviceStep1({ onNextStep }: IProps) {
  const { state, dispatch } = useAuthReducer();

  const ACTIVE_INIT = "매장을 선택해주세요.";

  const { form } = useStep1Form({ isAuthActive: state.authDisabled });

  const { useSendAuth, useVerifyPhone } = deviceQueries.useHandleDevice({
    onDispatch: dispatch,
    form,
  });

  const [stores, setStores] = useState<{ storeId: string; name: string }[]>();
  const [active, setActive] = useState(ACTIVE_INIT);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { open, close } = useOverlay();
  const handleOpenAlert = (key: string) => {
    open(() => (
      <Alert
        onClose={close}
        primaryButton={{ text: "", onClick: () => {} }}
        secondaryButton={{ text: "확인", onClick: close }}
        hasNoAction
      >
        <span>{key}된 매장이 없습니다.</span>
        <br />
        <span>매장을 먼저 {key}해주세요!</span>
      </Alert>
    ));
  };

  const mutateSendPhoneAuthCode = useSendAuth();
  const mutateVerifyAuthCode = useVerifyPhone(
    () => handleOpenAlert("등록"),
    (data) => {
      setStores(data.stores);
      if (data.stores.length === 1) setActive(data.stores[0].name);
      // eslint-disable-next-line
      alert("인증되었습니다.");
      dispatch({ type: "VERIFY_SUCCESS" });
      form.clearErrors("phone");
      form.clearErrors("authNumber");
    }
  );

  useEffect(() => {
    if (state.authExpired) {
      form.setError("phone", {
        message: "인증 유효 시간이 경과하였습니다. 재인증 해주세요.",
      });
    }
  }, [state.authExpired, form]);

  const handleAuthentication = (phoneNumber: string) => {
    mutateSendPhoneAuthCode.mutate({ phoneNumber });
  };

  const handleCheckAuth = (value: string) => {
    mutateVerifyAuthCode.mutate({
      phoneNumber: form.watch("phone").replaceAll("-", ""),
      code: Number(value),
    });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);

    if (active === ACTIVE_INIT) {
      handleOpenAlert("선택");
      setIsSubmitted(false);
      return;
    }

    const matchedStore = stores?.find((el) => el.name === active);
    if (!matchedStore) {
      handleOpenAlert("등록");
      setIsSubmitted(false);
      return;
    }

    onNextStep({ ...matchedStore, phoneNumber: form.watch("phone") });
  };

  const phoneBtnLabel = useMemo(() => {
    if (state.phoneBtnLoading) return <Spinner />;
    return state.hasRequestedAuth ? "재인증" : "인증 요청";
  }, [state.phoneBtnLoading, state.hasRequestedAuth]);

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="relative flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>휴대폰 번호</Label>
              <Controller
                name="phone"
                control={form.control}
                disabled={state.phoneDisabled}
                render={({ field }) => (
                  <div className="flex items-center gap-3">
                    <Input
                      {...field}
                      placeholder="사장님 계정에 등록된 전화번호를 입력해주세요."
                      onChange={(e) => {
                        const formatted = phoneNumberPattern(e.target.value);
                        form.setValue("phone", formatted);
                      }}
                      disabled={state.phoneDisabled}
                      hasError={!!form.formState.errors.phone}
                      maxLength={13}
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
                      disabled={!form.watch("phone") || state.phoneBtnDisabled}
                      onClick={() =>
                        handleAuthentication(field.value.split("-").join(""))
                      }
                    >
                      {phoneBtnLabel}
                    </ResponsiveButton>
                  </div>
                )}
              />
              <FormErrorMessage>
                {form.formState.errors.phone?.message?.toString()}
              </FormErrorMessage>
            </div>

            <Suspense fallback={<Skeleton.FieldGroup total={1} />}>
              <div className="flex flex-col gap-2">
                <Label>인증 번호</Label>
                <Controller
                  name="authNumber"
                  control={form.control}
                  disabled={state.authDisabled}
                  render={({ field }) => (
                    <div className="flex items-center gap-3">
                      <div className="relative w-full">
                        <Input
                          {...field}
                          placeholder="인증 번호를 입력해주세요."
                          hasError={!!form.formState.errors.authNumber}
                          className="!pr-10 md:!pr-13 lg:!pr-15"
                          disabled={state.authDisabled}
                          maxLength={6}
                          minLength={6}
                        />
                        {state.startTimer && (
                          <div className="font-regular absolute top-5 right-3 mt-[-2px] -translate-y-1/2 transform text-xs text-gray-200 transition-all duration-300 ease-in-out md:top-5 md:right-4 lg:top-6.5 lg:right-3 lg:text-[15px]">
                            {`${String(Math.floor(state.authTime / 60)).padStart(2, "0")}:${String(state.authTime % 60).padStart(2, "0")}`}
                          </div>
                        )}
                      </div>
                      <ResponsiveButton
                        type="button"
                        color="black"
                        disabled={state.authBtnDisabled}
                        onClick={() => handleCheckAuth(field.value)}
                        responsiveButtons={{
                          sm: { buttonSize: "sm", className: "!px-[27px]" },
                          md: { buttonSize: "sm", className: "w-[94px]" },
                          lg: { buttonSize: "lg", className: "w-[120px]" },
                        }}
                      >
                        {state.authBtnLoading ? <Spinner /> : "확인"}
                      </ResponsiveButton>
                    </div>
                  )}
                />
                <FormErrorMessage>
                  {form.formState.errors.authNumber?.message?.toString()}
                </FormErrorMessage>
              </div>
            </Suspense>
          </div>

          {Array.isArray(stores) && stores.length > 0 && (
            <div className="mt-4">
              {stores.length === 1 ? (
                <div className="flex flex-col gap-2">
                  <Label disabled>매장 선택</Label>
                  <Input value={stores[0].name} disabled />
                </div>
              ) : (
                <Suspense fallback={<Skeleton.FieldGroup total={1} />}>
                  <div className="mt-4 flex w-full flex-col gap-2">
                    <Label disabled>매장 선택</Label>
                    <Dropdown
                      data={stores?.map((el) => el.name)!}
                      defaultText="매장을 선택해주세요."
                      active={active}
                      setActive={setActive}
                      triggerClassName="!h-9 lg:!h-12 justify-between rounded-lg"
                    />
                  </div>
                </Suspense>
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
            disabled={!form.watch("authNumber") || isSubmitted}
          >
            {isSubmitted ? <Spinner /> : "다음"}
          </ResponsiveButton>
        </form>
      </Form>
    </div>
  );
}
