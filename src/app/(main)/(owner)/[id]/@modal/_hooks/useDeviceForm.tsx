import { UseMutationResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import getQueryClient from "@/app/get-query-client";
import { TypeDeviceForm } from "../../device/_schema/device.schema";
import { deviceKeys } from "../../device/_queries/keys";

export default function useDeviceForm({
  data,
  setIsSubmitted,
}: {
  data?: Device & {
    tableNo: number;
    ksnetDeviceNo: string;
  };
  setIsSubmitted: (checked: boolean) => void;
}) {
  const navigate = useRouter();
  const queryClient = getQueryClient();

  const form = useForm<TypeDeviceForm>({
    mode: "onSubmit",
    // resolver: zodResolver(deviceFormSchema),
    values: {
      name: data?.name ?? "",
      createdAt: data?.createdAt ?? "",
      state: data?.state || null,
      purpose: data?.purpose ?? "HALL",
      paymentType: data?.paymentType ?? "POSTPAID",
      tableNo: data?.tableNo ?? 0,
      deviceNumber: data?.ksnetDeviceNo ?? "",
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
    submitData: TypeDeviceForm,
    id: { storeId: string; deviceId: string }
  ) => {
    setIsSubmitted(true);

    action.mutate(
      {
        name: submitData.name,
        purpose: submitData.purpose,
        paymentType: submitData.paymentType,
        tableNo: submitData.tableNo,
        ksnetDeviceNo: submitData.deviceNumber,
        ...id,
      },
      {
        onSuccess: (_, variables) => {
          navigate.back();
          queryClient.invalidateQueries({
            queryKey: deviceKeys.all(variables.storeId),
          });
        },
        onError: (e) => {
          setIsSubmitted(false);
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
