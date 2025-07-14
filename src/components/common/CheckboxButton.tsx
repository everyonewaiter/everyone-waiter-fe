"use client";

import { cva } from "class-variance-authority";
import { useState, type ButtonHTMLAttributes } from "react";
import cn from "@/lib/utils";

const buttonCheckboxVariants = cva(
  "h-[18px] w-[18px] shrink-0 rounded-[4px] border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer bg-white fill-white flex items-center justify-center",
  {
    variants: {
      checked: {
        true: "bg-primary border-primary",
        false: "bg-white border-gray-400 hover:border-primary",
      },
      disabled: {
        true: "bg-gray-600 border-gray-400 cursor-not-allowed",
        false: "",
      },
    },
    compoundVariants: [
      {
        checked: true,
        disabled: true,
        className: "bg-point border-gray-400",
      },
    ],
    defaultVariants: {
      checked: false,
      disabled: false,
    },
  }
);
interface ButtonCheckboxProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
}

/**
 * 기존 Checkbox에서 불필요한 여백이 생기는 기본 스타일을 발견, 버튼으로 옮기는 작업을 진행했습니다.
 */

export default function ButtonCheckbox({
  checked: checkedProp,
  onChange,
  disabled = false,
  ...props
}: ButtonCheckboxProps) {
  const [internalChecked, setInternalChecked] = useState(false);
  const isControlled = typeof checkedProp === "boolean";
  const checked = isControlled ? checkedProp : internalChecked;

  const toggle = () => {
    if (disabled) return;
    const newValue = !checked;
    if (!isControlled) setInternalChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={disabled}
      aria-pressed={checked}
      className={cn(buttonCheckboxVariants({ checked, disabled }))}
      {...props}
    >
      <div className="flex items-center justify-center text-current">
        {checked && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.33366 2.5L3.75033 7.08333L1.66699 5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </button>
  );
}
