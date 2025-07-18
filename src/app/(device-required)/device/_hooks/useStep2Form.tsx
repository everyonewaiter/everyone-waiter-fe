import { useForm } from "react-hook-form";
import useMakeDeviceName from "./useMakeDeviceName";

export interface FormValues {
  deviceName: string;
  deviceNumber: string;
}

export default function useStep2Form() {
  const dn = useMakeDeviceName();

  const form = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      deviceName: dn,
      deviceNumber: "",
    },
  });

  return {
    form: { form, watch: form.watch, handleSubmit: form.handleSubmit },
  };
}
