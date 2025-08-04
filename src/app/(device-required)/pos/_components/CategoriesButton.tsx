import Button from "@/components/common/Button/Button";
import cn from "@/lib/utils";

interface IProps {
  categories: PosMenuData[];
  isActive: string;
  onSetIsActive: (value: string) => void;
}

export default function CategoriesButton({
  categories,
  isActive,
  onSetIsActive,
}: IProps) {
  return (
    <div className="flex flex-row gap-3">
      {categories && (
        <Button
          variant={isActive === "전체" ? "default" : "outline"}
          color={isActive === "전체" ? "primary" : "black"}
          className={cn(
            "button-sm text-s px-5",
            isActive === "전체" ? "text-white" : "text-gray-0"
          )}
          onClick={() => onSetIsActive("전체")}
        >
          전체
        </Button>
      )}
      {categories?.map((category) => (
        <Button
          key={category.categoryId}
          variant={isActive === category.categoryId ? "default" : "outline"}
          color={isActive === category.categoryId ? "primary" : "black"}
          className={cn(
            "button-sm text-s px-5",
            isActive === category.categoryId ? "text-white" : "text-gray-0"
          )}
          onClick={() => onSetIsActive(category.categoryId)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
