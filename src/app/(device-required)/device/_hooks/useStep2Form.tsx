import { useForm } from "react-hook-form";
import useMakeDeviceName from "./useMakeDeviceName";
import { TypeDeviceStep2Form } from "../_schema/device.schema";

export default function useStep2Form(purpose: DevicePurpose) {
  const dn = useMakeDeviceName(purpose);

  const form = useForm<TypeDeviceStep2Form>({
    mode: "onChange",
    // resolver: zodResolver(step2Schema),
    defaultValues: {
      deviceName: dn,
    },
  });

  return {
    form: { form, watch: form.watch, handleSubmit: form.handleSubmit },
  };
}
