"use client";

import { Button } from "@/components/common/Button";
import Calendar from "@/components/common/Calender";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/common/Popover";
import cn from "@/lib/utils";
import { addDays, format } from "date-fns";
import { CalendarDays as CalendarIcon } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";

export default function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            color="outline-black"
            className={cn(
              "relative h-[48px] w-[280px] justify-start border border-gray-500 px-4 py-3 pr-4 text-left text-[16px] font-normal text-gray-500",
              !date && "text-muted-foreground"
            )}
          >
            {/* eslint-disable-next-line  */}
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "yyyy.MM.dd")} -{" "}
                  {format(date.to, "yyyy.MM.dd")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>YYYY.MM.DD ~ YYYY.MM.DD</span>
            )}
            <CalendarIcon className="absolute right-3 size-6 text-gray-500" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
