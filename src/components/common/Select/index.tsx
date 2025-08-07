import {
  SelectWrapper,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Component";

interface IProps {
  value: string;
  onValueChange: (value: string) => void;
  triggerPlaceholder?: string;
  triggerValue: string | null;
  data?: { key: string; value: string; text: string }[];
  triggerClassName: string;
}

export default function Select({ ...props }: IProps) {
  return (
    <SelectWrapper value={props.value} onValueChange={props.onValueChange}>
      <SelectTrigger
        className={props.triggerClassName}
        aria-label={props.triggerPlaceholder}
      >
        <SelectValue placeholder={props.triggerPlaceholder}>
          {props.triggerValue}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {props.data?.map((item) => (
          <SelectItem key={item.key} value={item.value}>
            {item.text}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectWrapper>
  );
}
