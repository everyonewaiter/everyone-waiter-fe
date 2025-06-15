import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/common/Form";
import Icon from "@/components/common/Icon";
import Input from "@/components/common/Input";
import cn from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { UseFieldArrayRemove, useFormContext } from "react-hook-form";

interface IProps {
  index: number;
  changeMove: boolean;
  remove: UseFieldArrayRemove;
}

export default function CategoryFormField({
  index,
  changeMove,
  remove,
}: IProps) {
  const form = useFormContext<{
    categories: { name: string }[];
  }>();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: index });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="mb-2 flex gap-2">
      <FormField
        control={form.control}
        name={`categories.${index}.name`}
        render={({ field }) => (
          <FormItem className="w-full" ref={setNodeRef} style={style}>
            <FormLabel>카테고리 {index + 1}</FormLabel>
            <div className="flex items-center gap-2">
              <FormControl className="flex flex-1 gap-2">
                <Input
                  placeholder="카테고리 이름"
                  className="placeholder:text-gray-500"
                  readOnly={changeMove}
                  {...field}
                />
              </FormControl>
              <ResponsiveButton
                variant="outline"
                responsiveButtons={{
                  lg: {
                    buttonSize: "custom",
                    className: cn(
                      "h-10 w-10 rounded-[12px] border justify-center items-center bg-white",
                      changeMove ? "border-gray-600" : "border-status-error "
                    ),
                  },
                  md: {
                    buttonSize: "custom",
                    className: "w-7 h-7 rounded-[8px] border-gray-600 border",
                  },
                }}
                onClick={() => remove(index)}
              >
                <Icon
                  iconKey={changeMove ? "move" : "trash"}
                  className={cn(
                    changeMove ? "text-black" : "text-status-error",
                    "md:h-4 md:w-4 lg:h-5 lg:w-5"
                  )}
                  size={20}
                  {...attributes}
                  {...listeners}
                />
              </ResponsiveButton>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
