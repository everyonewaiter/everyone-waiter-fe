"use client";

import { Button } from "@/components/common/Button";
import DatePicker from "@/components/common/DatePicker";
import DateRangePicker from "@/components/common/DateRangePicker";
import Input from "@/components/common/Input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/common/Form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useOverlay from "@/hooks/use-overlay";
import ModalLayout from "@/components/modal/modalLayout";

const formSchema = z.object({
  username: z.string().min(2, "Help text").max(50, "Help text"),
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = () => {
    // data: z.infer<typeof formSchema>
  };

  const { open, close } = useOverlay();

  const handleOpenModal = () => {
    open(() => <ModalLayout onClose={close}>테스트 모달</ModalLayout>);
  };

  return (
    <div className="mx-auto flex h-screen w-1/2 flex-col items-center justify-center">
      <Button onClick={handleOpenModal} type="button" color="primary">
        모달 테스트
      </Button>

      <div className="mx-auto flex h-screen w-1/2 flex-col items-center justify-center gap-4">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
        >
          <Form {...form}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>user</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="user" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
          <Button type="submit" color="primary">
            Submit
          </Button>
        </form>
        <Select>
          <SelectTrigger className="w-[290px]">
            <SelectValue placeholder="Dropdown" />
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
              </SelectGroup>
            </SelectContent>
          </SelectTrigger>
        </Select>
        <Select>
          <SelectTrigger disabled className="w-[290px]">
            <SelectValue placeholder="Dropdown" />
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
              </SelectGroup>
            </SelectContent>
          </SelectTrigger>
        </Select>
        <DatePicker />
        <DateRangePicker />
      </div>
    </div>
  );
}
