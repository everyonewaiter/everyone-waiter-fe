"use client";

import { CalendarDays as CalendarIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import Button from "@/components/common/Button/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/common/Popover";
import cn from "@/lib/utils";

const Calendar = dynamic(() => import("@/components/common/Calender"), {
  ssr: false,
});

interface IProps {
  date: Date | null;
  onSetDate: (value: Date | null) => void;
}

export default function DatePicker({ date, onSetDate }: IProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          color="black"
          className={cn(
            "relative h-[48px] w-[280px] justify-between rounded-[10px] border border-gray-500 px-4 py-3 pr-4 text-left text-[16px] font-normal",
            !date && "text-muted-foreground"
          )}
        >
          {date ? (
            <span className="text-gray-0">
              {date
                .toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                .split(" ")
                .join("")
                .slice(0, -1)}
            </span>
          ) : (
            <span className="text-[16px] text-gray-200">YYYY.MM.DD</span>
          )}
          <CalendarIcon className="absolute right-3 size-6 text-gray-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mt-2 ml-15 w-auto p-0">
        <Calendar
          mode="single"
          selected={date!}
          onSelect={(day) => {
            onSetDate(day ?? null);
            setOpen(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
