"use client";

import { arrayMove } from "@dnd-kit/sortable";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import {
  Form,
  FormControl,
  FormErrorMessage,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/common/Form";
import Input from "@/components/common/Input";
import Switch from "@/components/common/Switch";
import { useStoreContext } from "@/providers/storeProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "@/components/common/Spinner";
import useOverlay from "@/hooks/useOverlay";
import QueryProviders from "@/app/query-providers";
import Alert from "@/components/common/Alert/Alert";
import Icon from "@/components/common/Icon";
import useSettings from "./_queries/useSettings";
import { settingsSchema, TypeSettingsForm } from "./_schema/settings.schema";

const Sortable = dynamic(() => import("@/components/Sortable"), {
  ssr: false,
  loading: () => <Spinner />,
});

const MoveableChips = dynamic(() => import("./_components/MoveableChips"), {
  ssr: false,
  loading: () => <Spinner />,
});

export default function Settings() {
  const { storeId } = useStoreContext();

  const [items, setItems] = useState<string[]>([]);

  const form = useForm<TypeSettingsForm>({
    mode: "onChange",
    resolver: zodResolver(settingsSchema),
    defaultValues: { optionText: "", deviceNumber: "" },
  });
  const { updateSetting, settingData } = useSettings(storeId);

  const submitHandler = () => {
    const value = form.getValues("optionText");
    if (value.trim()) {
      const nextItems = [...items, value];
      updateSetting({ staffCallOptions: nextItems }, () => {
        setItems(nextItems);
        form.reset();
      });
    }
  };

  const handleDrag = ({ active, over }: any) => {
    if (active.id !== over?.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      const changeSort = arrayMove(items, oldIndex, newIndex);
      updateSetting({ staffCallOptions: changeSort }, () =>
        setItems(changeSort)
      );
    }
  };

  useEffect(() => {
    if (settingData?.ksnetDeviceNo) {
      form.setValue("deviceNumber", settingData?.ksnetDeviceNo as string);
    }
    if (settingData?.staffCallOptions) {
      setItems(settingData?.staffCallOptions);
    }
  }, [form, settingData]);

  const { open, close } = useOverlay();

  const handleUpdateDeviceNumber = () => {
    const number = form.watch("deviceNumber");

    if (number === settingData?.ksnetDeviceNo) return;

    if (number.startsWith("DPTOTEST")) {
      open(() => (
        <QueryProviders>
          <Alert
            onClose={() => {
              close();
              form.setValue("deviceNumber", settingData?.ksnetDeviceNo || "");
            }}
            buttonText="등록하기"
          >
            <div className="mt-2">
              {number}은 테스트용 기기입니다.
              <br />
              <span className="text-xs !font-medium text-gray-400">
                결제 및 취소가 제대로 이루어지지 않을 수 있습니다.
              </span>
            </div>
          </Alert>
        </QueryProviders>
      ));
    }
  };

  return (
    <div className="flex w-[480px] flex-col gap-8">
      <div className="flex flex-col gap-2 md:gap-3">
        <h1 className="text-gray-0 text-lg font-semibold lg:text-2xl">설정</h1>
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="font-gray-0 before:bg-primary flex flex-row items-center gap-3 text-[15px] font-semibold before:inset-0 before:h-4 before:w-[2px] md:text-base lg:text-lg">
            매장
          </h2>
          <p className="mt-3 text-sm font-medium text-gray-100 md:mt-4">
            주방 프린터기와 연결된 기기를 선택해주세요.
          </p>
          <div className="mt-3 flex flex-row gap-3">
            {["POS", "HALL"].map((key) => {
              const isActive = settingData?.printerLocation === key;
              return (
                <ResponsiveButton
                  key={key}
                  variant="outline"
                  color={isActive ? "primary" : "grey"}
                  responsiveButtons={{
                    lg: {
                      buttonSize: "custom",
                      className: `h-10 w-full px-5 rounded-[8px]`,
                    },
                    md: {
                      buttonSize: "sm",
                      className: `w-full`,
                    },
                    sm: {
                      buttonSize: "sm",
                      className: `flex w-full`,
                    },
                  }}
                  commonClassName={isActive ? "" : "border-gray-500"}
                  onClick={() => updateSetting({ printerLocation: key })}
                >
                  {key === "HALL" ? "홀" : key}
                </ResponsiveButton>
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="font-gray-0 before:bg-primary flex flex-row items-center gap-3 text-[15px] font-semibold before:inset-0 before:h-4 before:w-[2px] md:text-base lg:text-lg">
            기기
          </h2>
          <p className="mt-3 text-sm font-medium text-gray-100 md:mt-4">
            매장 기기 번호
          </p>
          <FormProvider {...form}>
            <FormField
              control={form.control}
              name="deviceNumber"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-2 flex items-center gap-[6px]">
                    <FormControl>
                      <Input
                        className="!h-9 w-full !rounded-[10px] placeholder:text-xs placeholder:text-gray-300"
                        placeholder="기기 번호를 입력해주세요."
                        {...field}
                        hasError={!!form.formState.errors.deviceNumber}
                      />
                    </FormControl>

                    <ResponsiveButton
                      type="button"
                      color="black"
                      responsiveButtons={{
                        lg: {
                          buttonSize: "sm",
                          className: "relative gap-0 !w-[71px]",
                        },
                        md: {
                          buttonSize: "sm",
                          className: "flex",
                        },
                        sm: {
                          buttonSize: "sm",
                          className: "flex",
                        },
                      }}
                      onClick={handleUpdateDeviceNumber}
                    >
                      등록
                    </ResponsiveButton>
                  </div>
                  <FormErrorMessage className="mb-[1.5px]" />
                  {!form.formState.errors.deviceNumber &&
                    (form.watch("deviceNumber").startsWith("DPTOTEST") ||
                      settingData?.ksnetDeviceNo.startsWith("DPTOTEST")) && (
                      <FormMessage>
                        <Icon
                          iconKey="alert-triangle"
                          size={16}
                          className="stroke-3 text-gray-400"
                        />
                        테스트용 기기입니다.
                      </FormMessage>
                    )}
                </FormItem>
              )}
            />
          </FormProvider>
        </div>
        <div>
          <h2 className="font-gray-0 before:bg-primary flex flex-row items-center gap-3 text-[15px] font-semibold before:inset-0 before:h-4 before:w-[2px] md:text-base lg:text-lg">
            주문
          </h2>
          <div className="mt-3 flex flex-col gap-3 md:mt-4">
            <div className="flex w-full items-center">
              <span className="flex-1 text-sm">
                손님 테이블 메뉴 팝업창 띄우기
              </span>
              <Switch
                checked={settingData?.showMenuPopup}
                onCheckedChange={(checked) =>
                  updateSetting({ showMenuPopup: checked })
                }
              />
            </div>
            <div className="flex w-full items-center">
              <span className="flex-1 text-sm">
                손님 테이블 주문 내역에서 총 주문금액 표시하기
              </span>
              <Switch
                checked={settingData?.showOrderTotalPrice}
                onCheckedChange={(checked) =>
                  updateSetting({ showOrderTotalPrice: checked })
                }
              />
            </div>
            <div className="flex w-full flex-col gap-3 md:gap-2 lg:gap-3">
              <span className="flex-1 text-sm">
                직원 호출 페이지에 옵션 추가{" "}
                <span className="md:text-xxs ml-1 text-xs font-medium text-gray-300 lg:ml-[6px] lg:text-xs">
                  최대 12개
                </span>
              </span>
              <Form {...form}>
                <form
                  className="flex items-center gap-[6px]"
                  onSubmit={form.handleSubmit(submitHandler)}
                >
                  <Input
                    className="!h-9 w-full !rounded-[10px] placeholder:text-xs placeholder:text-gray-300"
                    placeholder="옵션명을 입력해주세요."
                    {...form.register("optionText")}
                  />
                  <ResponsiveButton
                    type="submit"
                    color="black"
                    responsiveButtons={{
                      lg: {
                        buttonSize: "sm",
                        className: "relative gap-0 !w-[71px]",
                      },
                      md: {
                        buttonSize: "sm",
                        className: "flex",
                      },
                      sm: {
                        buttonSize: "sm",
                        className: "flex",
                      },
                    }}
                  >
                    추가
                  </ResponsiveButton>
                </form>
              </Form>
            </div>
            <Sortable items={items} onDragEnd={handleDrag}>
              <div className="flex flex-wrap gap-2">
                {items.map((id) => (
                  <MoveableChips key={id} id={id} onDelete={() => {}}>
                    {id}
                  </MoveableChips>
                ))}
              </div>
            </Sortable>
          </div>
        </div>
      </div>
    </div>
  );
}
