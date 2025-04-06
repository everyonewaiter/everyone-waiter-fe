"use client";

import { Button } from "@/components/common/Button";
import Input from "@/components/common/Input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/common/form";
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div className="mx-auto flex h-screen w-1/2 flex-col items-center justify-center">
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
      <div className="my-4">
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
      </div>
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
    </div>
  );
}
