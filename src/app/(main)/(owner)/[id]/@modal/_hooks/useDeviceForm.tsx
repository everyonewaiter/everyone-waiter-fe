import getQueryClient from "@/app/get-query-client";
import { UseMutationResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function useDeviceForm() {
  const navigate = useRouter();
  const queryClient = getQueryClient();

  const form = useForm<
    Omit<Device, "updatedAt" | "storeId" | "deviceId"> & {
      deviceNumber: string;
      tableNo: number;
      createdAt: string;
    }
  >({
    defaultValues: {
      name: "",
      createdAt: "",
      state: "",
      purpose: "HALL",
      paymentType: "POSTPAID",
      tableNo: 0,
      deviceNumber: "",
    },
  });

  const submitHandler = (
    action: UseMutationResult<
      any,
      Error,
      Pick<Device, "name" | "purpose" | "paymentType"> & {
        tableNo: number;
        ksnetDeviceNo: string;
      } & { storeId: string; deviceId: string },
      unknown
    >,
    storeId: string,
    deviceId: string
  ) => {
    action.mutate(
      {
        name: form.watch("name"),
        purpose: form.watch("purpose") as DevicePurpose,
        paymentType: form.watch("paymentType") as DevicePayment,
        tableNo: form.watch("tableNo") ?? 0,
        ksnetDeviceNo: form.watch("deviceNumber"),
        storeId,
        deviceId,
      },
      {
        onSuccess: () => {
          navigate.back();
          queryClient.invalidateQueries({ queryKey: ["get-devices"] });
        },
        onError: (e) => {
          const res = (e as any).response.data;
          if (
            ["ALREADY_USE_DEVICE_NAME", "DEVICE_NOT_FOUND"].includes(res.code)
          ) {
            form.setError("name", res.message);
          }
        },
      }
    );
  };

  return {
    form,
    submitHandler,
  };
}
