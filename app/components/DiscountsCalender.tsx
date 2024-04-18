import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";

/**
 * カレンダーの日付を表示する.
 */
function ServerDay(
  props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <PickersDay
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      selected={isSelected}
    />
  );
}

const DiscountsCalender = ({
  discountDates,
}: {
  discountDates: CalenderDates;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [highlightedDays, setHighlightedDays] = useState([] as number[]);

  useEffect(() => {
    setHighlightedDays(pickHighlightedDays(dayjs()));
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discountDates]);

  /**
   * 月を変更したときの処理.
   */
  const handleMonthChange = (date: Dayjs) => {
    setIsLoading(true);
    setHighlightedDays(pickHighlightedDays(date));
    setIsLoading(false);
  };

  const pickHighlightedDays = (date: Dayjs): number[] => {
    if (
      discountDates[date.year()] !== undefined &&
      discountDates[date.year()][date.month() + 1] !== undefined
    ) {
      return discountDates[date.year()][date.month() + 1];
    }
    return [];
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        loading={isLoading}
        onMonthChange={handleMonthChange}
        onYearChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          } as any,
        }}
      />
    </LocalizationProvider>
  );
};

export default DiscountsCalender;
