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
        "w-[340px] bg-white p-5 shadow-xs lg:flex lg:w-[550px] lg:flex-col lg:items-center lg:p-6",
        className
      )}
      formatters={{
        formatWeekdayName: (weekday) =>
          ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][weekday.getDay()],
      }}
      classNames={{
        // 월 컨테이너
        months: "flex flex-col lg:flex-row gap-2",
        month: "flex flex-col gap-6",
        // 상단 네비게이션 영역
        caption: "flex justify-center mb-0 relative items-center w-full",
        caption_label: "text-xl font-bold text-gray-0",
        nav: "flex items-center gap-1",
        nav_button: "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        nav_button_previous: "absolute left-10 lg:left-10 text-gray-200",
        nav_button_next: "absolute right-7 lg:right-7 text-gray-200",
        // 달력 테이블
        table: "w-full border-collapse space-x-1",
        head_row: "flex items-center h-[32px] lg:h-10",
        head_cell:
          "text-gray-0 text-s w-[calc(100%/7)] font-normal w-[32px] lg:w-10 ",
        row: "flex w-full mt-[6px] lg:mt-2 flex items-center",
        // 날짜 셀과 날짜
        cell: cn(
          "w-[calc(100%/7)] relative p-0",
          // 범위 선택된 셀들을 하나의 배경으로 연결
          "[&:has(.day-range-start)]:bg-primary/[0.06]",
          "[&:has(.day-range-end)]:bg-primary/[0.06]",
          "[&:has(.day-range-middle)]:bg-primary/[0.06]",
          // 시작과 끝 셀의 모서리만 둥글게
          "[&:has(.day-range-start)]:rounded-l-full",
          "[&:has(.day-range-end)]:rounded-r-full"
        ),
        day: cn(
          " size-[32px] lg:size-10",
          "flex items-center justify-center",
          "hover:bg-primary/[0.06]",
          "text-gray-0"
        ),
        // 특수 상태의 날짜
        // 선택된 날짜
        day_selected: "bg-primary  focus:bg-primary rounded-full",
        // 오늘 날짜
        day_today: "bg-accent text-accent-foreground",
        // 현재 월에 속하지 않는 날짜
        day_outside: "text-gray-800",
        // 비활성화된 날짜
        day_disabled: "opacity-50",
        // 범위 선택 시 스타일
        day_range_start:
          "day-range-start text-white rounded-r-full aria-selected:bg-primary ",
        day_range_end: "text-white rounded-r-full aria-selected:bg-primary ",
        day_range_middle: "day-range-middle bg-primary/[0.06] rounded-none",
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
