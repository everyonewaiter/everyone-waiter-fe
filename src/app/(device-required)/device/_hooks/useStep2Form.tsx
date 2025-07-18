import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useMakeDeviceName from "./useMakeDeviceName";
import { step2Schema, TypeDeviceStep2Form } from "../_schema/device.schema";

export default function useStep2Form() {
  const dn = useMakeDeviceName();

  const form = useForm<TypeDeviceStep2Form>({
    mode: "onChange",
    resolver: zodResolver(step2Schema),
    defaultValues: {
      deviceName: dn,
      deviceNumber: "",
    },
  });

  return {
    form: { form, watch: form.watch, handleSubmit: form.handleSubmit },
  };
}
