import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import {
  Form,
  FormControl,
  FormErrorMessage,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/common/Form";
import Icon from "@/components/common/Icon/Icon";
import Input from "@/components/common/Input";
import QueryProviders from "@/app/query-providers";
import useOverlay from "@/hooks/useOverlay";
import Alert from "@/components/common/Alert/Alert";
import {
  deviceNumberSchema,
  TypeSettingsDeviceForm,
} from "../_schema/settings.schema";

interface IProps {
  ksnetDeviceNo?: string;
  onAction: (value: string) => void;
}

export default function DeviceSection({ ksnetDeviceNo, onAction }: IProps) {
  const form = useForm<TypeSettingsDeviceForm>({
    mode: "onSubmit",
    resolver: zodResolver(deviceNumberSchema),
  });

  const { open, close } = useOverlay();

  useEffect(() => {
    if (ksnetDeviceNo) {
      form.reset({ deviceNumber: ksnetDeviceNo });
    }
    // eslint-disable-next-line
  }, [ksnetDeviceNo]);

  const handleUpdateDeviceNumber = (data: TypeSettingsDeviceForm) => {
    if (data.deviceNumber === ksnetDeviceNo) return;
    if (data.deviceNumber.startsWith("DPTOTEST")) {
      open(() => (
        <QueryProviders>
          <Alert
            onClose={() => {
              close();
              form.setValue("deviceNumber", ksnetDeviceNo || "");
            }}
            buttonText="등록하기"
            onAction={() => {
              const value = form.getValues("deviceNumber");
              if (value.trim()) {
                onAction(value);
              }
            }}
          >
            <div className="mt-2">
              {data.deviceNumber}은 테스트용 기기입니다.
              <br />
              <span className="text-xs !font-medium text-gray-400">
                결제 및 취소가 제대로 이루어지지 않을 수 있습니다.
              </span>
            </div>
          </Alert>
        </QueryProviders>
      ));
    } else {
      form.setValue("deviceNumber", ksnetDeviceNo || "");
      close();
    }
  };

  return (
    <div>
      <h2 className="font-gray-0 before:bg-primary flex flex-row items-center gap-3 text-[15px] font-semibold before:inset-0 before:h-4 before:w-[2px] md:text-base lg:text-lg">
        기기
      </h2>
      <p className="mt-3 text-sm font-medium text-gray-100 md:mt-4">
        매장 기기 번호
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdateDeviceNumber)}>
          <FormField
            control={form.control}
            name="deviceNumber"
            render={({ field }) => (
              <FormItem>
                <div className="mt-2 flex items-center gap-[6px]">
                  <FormControl>
                    <Input
                      className="!h-9 w-full !rounded-[10px] placeholder:text-xs"
                      placeholder="기기 번호를 입력해주세요."
                      {...field}
                      hasError={!!form.formState.errors.deviceNumber}
                    />
                  </FormControl>

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
                    등록
                  </ResponsiveButton>
                </div>
                <FormErrorMessage className="mb-[1.5px]" />
                {!form.formState.errors.deviceNumber &&
                  (form.watch("deviceNumber")?.startsWith("DPTOTEST") ||
                    ksnetDeviceNo?.startsWith("DPTOTEST")) && (
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
        </form>
      </Form>
    </div>
  );
}
