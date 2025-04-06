"use client";

import cn from "@/lib/utils";
import { ChevronLeft, ChevronRight, LucideProps } from "lucide-react";
import * as React from "react";
import { DayPicker } from "react-day-picker";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

type IconProps = LucideProps;
function IconLeft({ className = "", ...props }: IconProps) {
  return <ChevronLeft className={cn("h-4 w-4", className)} {...props} />;
}

function IconRight({ className = "", ...props }: IconProps) {
  return <ChevronRight className={cn("h-4 w-4", className)} {...props} />;
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "flex min-w-[550px] items-center justify-center bg-white p-6",
        className
      )}
      formatters={{
        formatWeekdayName: (weekday) =>
          ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][weekday.getDay()],
      }}
      classNames={{
        // 월 컨테이너
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        // 상단 네비게이션 영역
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-xl font-bold text-gray-0",
        nav: "flex items-center gap-1",
        nav_button: "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        nav_button_previous: "absolute left-40 text-gray-200",
        nav_button_next: "absolute right-40 text-gray-200",
        // 달력 테이블
        table: "w-full border-collapse space-x-1",
        head_row: "flex items-center gap-[46px]",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2 flex items-center gap-[37px]",
        // 날짜 셀과 날짜
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          "hover:cursor-pointer disabled:cursor-not-allowed hover:bg-primary/[0.06] rounded-full size-10 p-0 font-normal aria-selected:text-white aria-selected:hover:bg-primary  text-gray-0 text-sm"
        ),
        // 특수 상태의 날짜
        // 선택된 날짜
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-full",
        // 오늘 날짜
        day_today: "bg-accent text-accent-foreground",
        // 현재 월에 속하지 않는 날짜
        day_outside: "text-[#C0C0C0]",
        // 비활성화된 날짜
        day_disabled: "text-muted-foreground opacity-50",
        // 범위 선택 시 스타일
        day_range_start:
          "day-range-start aria-selected:bg-primary rounded-full aria-selected:text-primary-foreground",
        day_range_end:
          "day-range-end aria-selected:bg-primary rounded-full aria-selected:text-primary-foreground",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        // 숨겨진 날짜
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft,
        IconRight,
      }}
      {...props}
    />
  );
}

export default Calendar;
