import { Form } from "@/components/common/Form";
import {
  useFormContext,
  FieldArrayWithId,
  UseFieldArrayRemove,
} from "react-hook-form";
import CategoryFormField from "./CategoryFormField";

interface IProps {
  changeMove: boolean;
  fields: FieldArrayWithId<
    {
      categories: {
        name: string;
      }[];
    },
    "categories",
    "id"
  >[];
  remove: UseFieldArrayRemove;
}

export default function CategoryForm({ changeMove, fields, remove }: IProps) {
  const form = useFormContext<{ categories: { name: string }[] }>();

  const submitHandler = () => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="flex flex-col gap-4"
      >
        {fields.map((field, index) => (
          <CategoryFormField
            key={field.id}
            index={index}
            changeMove={changeMove}
            remove={remove}
          />
        ))}
      </form>
    </Form>
  );
}
