/* eslint-disable react-hooks/exhaustive-deps */

// import Dropdown from "@/components/common/Dropdown";
import { Form } from "@/components/common/Form";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import ResponsiveButton from "@/components/common/ResponsiveButton";
import phoneNumberPattern from "@/lib/formatting/formatPhoneNumber";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IProps {
  onNextStep: () => void;
}

export default function AddDeviceStep1({ onNextStep }: IProps) {
  const INIT_TIME = 10;

  const form = useForm({
    mode: "onChange",
  });
  const [authTime, setAuthTime] = useState(INIT_TIME);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [disables, setDisables] = useState({
    requestAuthentication: true,
    requestNumCheck: true,
    goToNextStep: true,
  });
  // const [active, setActive] = useState("");

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

  // NOTE - 인증 요청
  const handleAuthentication = () => {
    setIsSubmitted(true);
    setDisables((prev) => ({ ...prev, requestNumCheck: false }));

    // const phoneNumber = form.watch("phone");

    setAuthTime(INIT_TIME);
  };

  // NOTE - 인증 확인
  const handleCheckAuth = () => {
    // 성공 시
    setDisables({
      requestAuthentication: true,
      requestNumCheck: true,
      goToNextStep: false,
    });
    setIsSubmitted(false);

    // 실패 시
    // setDisables({ ...disables, requestNumCheck: false, goToNextStep: true });
    // setIsSubmitted(true);
  };

  const handleNext = () => {
    onNextStep();
  };

  // const hasStore = 2;

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
      {disables.goToNextStep && (
        <div className="mt-4">
          {/* API 연결 시 복구 */}
          {/* {hasStore === 1 ? (
            <div className="flex flex-col gap-2">
              <Label disabled>매장 선택</Label>
              <Input value={"모두의 웨이터"} disabled />
            </div>
          ) : (
            <div className="flex w-full flex-col gap-2">
              <Label disabled>매장 선택</Label>
              <Dropdown
                data={["스토어1", "스토어2"]}
                defaultText="매장을 선택해주세요."
                active={active}
                setActive={setActive}
                triggerClassName="!h-9 lg:!h-12 rounded-[8px] lg:rounded-[12px] w-full"
                className="w-70 md:!w-[324px] lg:!w-120"
              />
            </div>
          )} */}
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
      >
        다음
      </ResponsiveButton>
    </>
  );
}
