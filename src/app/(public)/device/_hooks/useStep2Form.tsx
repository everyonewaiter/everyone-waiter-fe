import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setEncryptedItem } from "@/lib/auth/secureStorage";
import makeDeviceName from "@/utils/makeDeviceName";
import { TypeDeviceStep2Form } from "../_schema/device.schema";
import { deviceQueries } from "../_queries/useDeviceInfo";

interface IProps {
  storeId: string;
  phoneNumber: string;
  storeName: string;
}

export default function useStep2Form({
  storeId,
  phoneNumber,
  storeName,
}: IProps) {
  const navigate = useRouter();
  const [purpose, setPurpose] = useState<DevicePurpose>("HALL");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TypeDeviceStep2Form>({
    mode: "onChange",
    // resolver: zodResolver(step2Schema),
    defaultValues: {
      deviceName: "",
    },
  });

  useEffect(() => {
    form.setValue("deviceName", makeDeviceName(purpose));
    // eslint-disable-next-line
  }, [purpose]);

  const { mutate } = deviceQueries.useAddDevice();

  const submitHandler = (data: TypeDeviceStep2Form) => {
    setIsSubmitting(true);

    const submitData = {
      phoneNumber: phoneNumber.replaceAll("-", ""),
      storeId,
      name: data.deviceName,
      purpose,
      tableNo: 1,
      paymentType: "POSTPAID" as DevicePayment,
    };

    mutate(submitData, {
      onSuccess: async (returnData) => {
        const { deviceId, secretKey } = returnData;
        await setEncryptedItem({
          key: "@deviceInfo",
          value: {
            deviceId,
            storeId: submitData.storeId,
            storeName,
            name: submitData.name,
            purpose: submitData.purpose,
          },
          deviceId: String(deviceId),
          storeId: submitData.storeId,
        });

        await setEncryptedItem({
          key: "@secretKey",
          value: secretKey,
          deviceId: String(deviceId),
          storeId: submitData.storeId,
        });
        localStorage.setItem(
          "@meta",
          JSON.stringify({
            deviceId,
            storeId: submitData.storeId,
          })
        );

        navigate.replace(purpose === "HALL" ? "/hall" : "/pos");
      },
      onError: () => {
        setIsSubmitting(false);
      },
    });
  };

  return {
    form,
    submitHandler,
    purpose,
    setPurpose,
    isSubmitting,
  };
}
