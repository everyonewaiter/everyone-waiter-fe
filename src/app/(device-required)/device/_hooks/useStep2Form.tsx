import { useForm } from "react-hook-form";
import { TypeDeviceStep2Form } from "../_schema/device.schema";

export default function useStep2Form() {
  const form = useForm<TypeDeviceStep2Form>({
    mode: "onChange",
    // resolver: zodResolver(step2Schema),
    defaultValues: {
      deviceName: "",
    },
  });

  return {
    form: { form, watch: form.watch, handleSubmit: form.handleSubmit },
  };
}
