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

/**
 * APIから日付データを取得する.
 */
const fetchDates = async (itemId: number): Promise<CalenderDates> => {
  console.log("fetchDates開始");
  // TODO: APIからデータ取得
  const response = await fetch(`/api/limitedDiscounts/${itemId}`, {
    method: "GET",
  });

  const limitedDiscounts: LimitedDiscount[] = await response.json();
  const result: CalenderDates = {};

  limitedDiscounts.forEach((limitedDiscount) => {
    const date = new Date(limitedDiscount.addedOn);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if (result[year] === undefined) {
      result[year] = {};
    }
    if (result[year][month] === undefined) {
      result[year][month] = [];
    }
    result[year][month].push(day);
  });

  console.log("fetchDates終わり");
  return result;
};

const DiscountsCalender = ({ itemId }: { itemId: number }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [highlightedDays, setHighlightedDays] = useState([] as number[]);
  const [dates, setDates] = useState({} as CalenderDates);

  useEffect(() => {
    (async () => {
      const data: CalenderDates = await fetchDates(itemId);
      setDates(data);
    })();
  }, [itemId]);

  useEffect(() => {
    console.log("datesが変更されたときのuseEffect");
    console.log(dates);
    setHighlightedDays(pickHighlightedDays(dayjs()));
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dates]);

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
      dates[date.year()] !== undefined &&
      dates[date.year()][date.month() + 1] !== undefined
    ) {
      return dates[date.year()][date.month() + 1];
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
