"use client";

import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { Form } from "@/components/common/Form";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import useOverlay from "@/hooks/useOverlay";
import Spinner from "@/components/common/Spinner";
import SkeletonGroup from "@/components/common/Skeleton/SkeletonGroup";
import SkeletonInput from "@/components/common/Skeleton/SkeletonInput";
import { deviceQueries } from "../../_queries/useDeviceInfo";
import useStep1Form from "../../_hooks/useStep1Form";
import PhoneInput from "../PhoneInput";
import AuthInput from "../AuthInput";
import useAuthReducer from "../../_hooks/useAuthReducer";

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

  const { form } = useStep1Form({ isAuthActive: state.authDisabled });
  const { watch, reset, setError, control } = form;

  const [stores, setStores] = useState<{ storeId: string; name: string }[]>();
  const [active, setActive] = useState("매장을 선택해주세요.");

  const send = deviceQueries.useSendAuth();
  const verify = deviceQueries.useVerifyPhone();

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

  const handleAuthentication = () => {
    dispatch({ type: "CLICK_AUTH_BTN" });

    const digits = watch("phone").replaceAll("-", "");
    send.mutate(
      { phoneNumber: digits },
      {
        onError: (e: any) => {
          setError("phone", e);
          dispatch({ type: "RESET" });
        },
      }
    );
  };

  const handleCheckAuth = () => {
    const phoneNumber = watch("phone").replaceAll("-", "");
    const code = Number(watch("authNumber"));

    verify.mutate(
      { phoneNumber, code },
      {
        onSuccess: (data) => {
          if (
            !data ||
            !Array.isArray(data.stores) ||
            data.stores.length === 0
          ) {
            handleOpenAlert();
            reset();
            dispatch({ type: "RESET" });
          } else {
            setStores(data.stores);
            if (data.stores.length === 1) setActive(data.stores[0].name);
            dispatch({ type: "VERIFY_SUCCESS" });
          }
        },
        onError: () => dispatch({ type: "VERIFY_FAIL" }),
      }
    );
  };

  const nextDisabled = !(state.phoneDisabled && state.authDisabled);

  const handleSubmit = () => {
    const matchedStore = stores?.find((el) => el.name === active);
    if (!matchedStore) {
      handleOpenAlert();
    } else {
      onNextStep({ ...matchedStore, phoneNumber: watch("phone") });
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="relative flex flex-col gap-4">
            <PhoneInput
              control={control}
              onClick={handleAuthentication}
              disabled={state.phoneDisabled}
              isSubmitted={state.hasRequestedAuth}
              loading={state.phoneBtnLoading}
            />

            {!state.authDisabled && (
              <Suspense fallback={<SkeletonGroup />}>
                <AuthInput
                  control={control}
                  onClick={handleCheckAuth}
                  authTime={state.authTime}
                  disabled={state.authBtnDisabled}
                  loading={state.authBtnLoading}
                  isSubmitted={state.hasRequestedAuth}
                />
              </Suspense>
            )}
          </div>

          {Array.isArray(stores) && stores.length > 0 && (
            <div className="mt-4">
              {stores.length === 1 ? (
                <div className="flex flex-col gap-2">
                  <Label disabled>매장 선택</Label>
                  <Input value={stores[0].name} disabled />
                </div>
              ) : (
                <Suspense fallback={<SkeletonInput />}>
                  <div className="flex w-full flex-col gap-2">
                    <Label disabled>매장 선택</Label>
                    <Dropdown
                      data={stores.map((el) => el.name)}
                      defaultText="매장을 선택해주세요."
                      active={active}
                      setActive={setActive}
                      triggerClassName="!h-9 lg:!h-12 rounded-[8px] lg:rounded-[12px] w-full"
                      className="w-70 md:!w-[324px] lg:!w-120"
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
            disabled={nextDisabled}
          >
            다음
          </ResponsiveButton>
        </form>
      </Form>
    </div>
  );
}
