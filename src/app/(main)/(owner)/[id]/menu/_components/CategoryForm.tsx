import { Form } from "@/components/common/Form";
import { useFormContext } from "react-hook-form";
import CategoryFormField from "./CategoryFormField";

interface IProps {
  changeMove: boolean;
}

export default function CategoryForm({ changeMove }: IProps) {
  const form = useFormContext<{ categories: Category[] }>();

  const submitHandler = () => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="flex flex-col md:gap-3 lg:gap-4"
      >
        {form
          .watch("categories")
          ?.map((field) => (
            <CategoryFormField
              key={field.categoryId}
              changeMove={changeMove}
              fields={field}
            />
          ))}
      </form>
    </Form>
  );
}
