"use client";

import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/common/Button/Button";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { ScrollArea } from "@/components/common/ScrollArea";
import cn from "@/lib/utils";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import OptionGroupSection from "../OptionGroupSection";

interface IProps {
  data: MenuDetail;
  type: "order" | "preview";
  layoutClassName?: string;
  close?: () => void;
  onAddOrderMenu?: ({
    menuId,
    menuName,
    quantity,
    totalPrice,
    menuOptionGroups,
  }: {
    menuId: string;
    menuName: string;
    quantity: number;
    totalPrice: number;
    menuOptionGroups: OrderOptionGroups[];
  }) => void;
}

function MenuModal({
  data,
  type,
  layoutClassName,
  close,
  onAddOrderMenu,
}: IProps) {
  const navigate = useRouter();

  const handleClose = () => {
    if (close) {
      close();
    } else {
      navigate.back();
    }
  };

  const defaultRequiredOptions: Omit<OrderOptionGroups, "printEnabled">[] =
    data?.menuOptionGroups
      .filter((group) => group.type === "MANDATORY")
      .map((group) => ({
        orderOptionGroupId: group.menuOptionGroupId,
        name: group.name,
        type: group.type,
        orderOptions: group.menuOptions.length ? [group.menuOptions[0]] : [],
      }));

  const form = useForm<{
    required: Omit<OrderOptionGroups, "printEnabled">[];
    optional: Omit<OrderOptionGroups, "printEnabled">[];
  }>({
    mode: "onChange",
    defaultValues: {
      required: defaultRequiredOptions,
      optional: [],
    },
  });

  const handleTotalPrice = () => {
    let result = data?.price;
    if (form.watch("required")?.length > 0) {
      result += form
        .watch("required")
        .map((el) =>
          el.orderOptions.reduce((acc, option) => acc + option.price, 0)
        )
        .reduce((a, b) => a + b, 0);
    }
    if (form.watch("optional")?.length > 0) {
      result += form
        .watch("optional")
        .map((el) =>
          el.orderOptions.reduce((acc, option) => acc + option.price, 0)
        )
        .reduce((a, b) => a + b, 0);
    }
    return result;
  };

  const total = form
    .watch("required")
    ?.map((el) => el.orderOptions.map((o) => o.price))
    .flat()
    .reduce((sum, price) => sum + price, 0);

  const MandatoryOptions = data?.menuOptionGroups.filter(
    (el) => el.type === "MANDATORY"
  );

  const OptionalOptions = data?.menuOptionGroups.filter(
    (el) => el.type === "OPTIONAL"
  );

  return (
    <div
      className="bg-opacity-100 fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={handleClose}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Escape") handleClose();
      }}
    >
      <div
        className={cn(
          "relative flex h-[650px] w-full flex-col gap-6 rounded-3xl bg-white p-5 md:h-[460px] md:flex-row md:p-4 lg:gap-8 lg:p-6",
          layoutClassName
        )}
        onClick={(e) => e.stopPropagation()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Escape") e.stopPropagation();
        }}
      >
        <div className="flex h-[160px] overflow-hidden rounded-2xl md:h-full md:flex-1 lg:h-full lg:flex-1 lg:rounded-[28px]">
          {data?.image && (
            <ImageWithFallback
              src={data?.image}
              alt="menu image"
              className="object-cover"
              width={500}
              height={160}
              unoptimized
            />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-6">
          <ScrollArea className="flex flex-col md:h-[428px] lg:h-[522px]">
            <div className="flex gap-2">
              {data?.label !== "DEFAULT" && (
                <ResponsiveButton
                  variant="outline"
                  responsiveButtons={{
                    lg: {
                      buttonSize: "md",
                      className:
                        "font-regular !h-10 !rounded-[40px] text-[15px]",
                    },
                    md: {
                      buttonSize: "sm",
                      className: "!h-8 !rounded-[40px] !px-4 !text-s",
                    },
                    sm: {
                      buttonSize: "sm",
                      className: "!h-8 !rounded-[40px] !px-4 !text-s",
                    },
                  }}
                >
                  {data?.label}
                </ResponsiveButton>
              )}
              {data?.spicy && (
                <ResponsiveButton
                  variant="outline"
                  responsiveButtons={{
                    lg: {
                      buttonSize: "md",
                      className:
                        "font-regular !h-10 !rounded-[40px] text-[15px]",
                    },
                    md: {
                      buttonSize: "sm",
                      className: "!h-8 !rounded-[40px] !px-4 !text-s",
                    },
                    sm: {
                      buttonSize: "sm",
                      className: "!h-8 !rounded-[40px] !px-4 !text-s",
                    },
                  }}
                >
                  {"🌶️".repeat(data?.spicy)}
                </ResponsiveButton>
              )}
            </div>
            <div className="mt-4 lg:mt-5">
              <h1 className="text-gray-0 text-lg font-semibold md:text-xl lg:text-3xl lg:font-bold">
                {data?.name}
              </h1>
              <p className="font-regular text-gray-0 mt-[10px] text-sm md:mt-3 lg:mt-4 lg:text-lg">
                {data?.description}
              </p>
              <div className="mt-3 w-full text-right text-2xl font-bold md:mt-5 lg:text-3xl">
                {data?.price.toLocaleString()}원
              </div>
            </div>

            {data?.menuOptionGroups?.length > 0 && (
              <>
                <div className="my-4 h-2 w-full rounded-lg bg-gray-700 lg:my-5" />
                <FormProvider {...form}>
                  <div className="flex flex-col">
                    {Array.isArray(MandatoryOptions) &&
                      MandatoryOptions?.length > 0 && (
                        <OptionGroupSection
                          data={data.menuOptionGroups.filter(
                            (el) => el.type === "MANDATORY"
                          )}
                          type={type}
                          required
                        >
                          필수 추가 옵션
                        </OptionGroupSection>
                      )}

                    {Array.isArray(OptionalOptions) &&
                      OptionalOptions?.length > 0 && (
                        <>
                          {Array.isArray(MandatoryOptions) &&
                            MandatoryOptions?.length > 0 && (
                              <div className="h-[1px] w-full bg-gray-600 md:my-4 lg:my-5" />
                            )}
                          <OptionGroupSection
                            data={data.menuOptionGroups.filter(
                              (el) => el.type === "OPTIONAL"
                            )}
                            type={type}
                          >
                            선택 추가 옵션
                          </OptionGroupSection>
                        </>
                      )}
                  </div>
                </FormProvider>
              </>
            )}
          </ScrollArea>
          {type === "order" && data?.state !== "SOLD_OUT" && (
            <Button
              color="primary"
              className="button-xl flex gap-2 !text-[15px] !font-medium"
              onClick={() => {
                onAddOrderMenu?.({
                  menuId: data?.menuId,
                  menuName: data?.name,
                  quantity: 1,
                  totalPrice: (data?.price || 0) + (total || 0),
                  menuOptionGroups: [
                    ...form.watch("required").map((el) => ({
                      ...el,
                      printEnabled: true,
                      type: "MANDATORY",
                    })),
                    ...form.watch("optional").map((el) => ({
                      ...el,
                      printEnabled: true,
                      type: "OPTIONAL",
                    })),
                  ],
                });
                close?.();
              }}
            >
              총{handleTotalPrice().toLocaleString()}
              원 <div className="bg-black-opacity-1 h-1 w-1 rounded-full" />{" "}
              메뉴 추가
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuModal;
