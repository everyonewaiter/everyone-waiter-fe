"use client";

import { Button } from "@/components/common/Button/Button";
import Calendar from "@/components/common/Calender";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/common/Popover";
import cn from "@/lib/utils";
import { format } from "date-fns";
import { CalendarDays as CalendarIcon } from "lucide-react";
import * as React from "react";

export default function DatePicker() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          color="black"
          className={cn(
            "relative h-[48px] w-[280px] justify-between border border-gray-500 px-4 py-3 pr-4 text-left text-[16px] font-normal text-gray-500",
            !date && "text-muted-foreground"
          )}
        >
          {date ? (
            format(date, "yyyy.MM.dd")
          ) : (
            <span className="text-[16px] text-gray-200">YYYY.MM.DD</span>
          )}
          <CalendarIcon className="absolute right-3 size-6 text-gray-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
