import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import getQueryClient from "@/app/get-query-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  deviceFormSchema,
  TypeDeviceForm,
} from "../../device/_schema/device.schema";
import { deviceKeys } from "../../device/_queries/keys";
import { deviceQueries } from "../../device/_queries/useDevice";

interface IProps {
  deviceId: string;
  storeId: string;
}

export default function useDeviceForm({ deviceId, storeId }: IProps) {
  const navigate = useRouter();
  const queryClient = getQueryClient();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data: deviceDetail } = deviceQueries.useDetails(deviceId, storeId);
  const update = deviceQueries.useUpdateDevice();

  const form = useForm<TypeDeviceForm>({
    mode: "onChange",
    resolver: zodResolver(deviceFormSchema),
    values: {
      name: "",
      createdAt: "",
      state: null,
      purpose: "HALL",
      paymentType: "POSTPAID",
      tableNo: "0",
      deviceNumber: "",
    },
  });

  useEffect(() => {
    if (deviceDetail?.deviceId) {
      form.reset({
        name: deviceDetail.name,
        createdAt: deviceDetail.createdAt,
        state: deviceDetail.state,
        purpose: deviceDetail.purpose,
        paymentType: deviceDetail.paymentType,
        tableNo: String(deviceDetail.tableNo),
        deviceNumber: deviceDetail.ksnetDeviceNo,
      });
    }
    // eslint-disable-next-line
  }, [deviceDetail]);

  const submitHandler = (
    submitData: TypeDeviceForm,
    id: { storeId: string; deviceId: string }
  ) => {
    setIsSubmitted(true);

    update.mutate(
      {
        name: submitData.name,
        purpose: submitData.purpose,
        paymentType: submitData.paymentType,
        tableNo: Number(submitData.tableNo),
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
    isSubmitted,
    deviceDetail,
  };
}
