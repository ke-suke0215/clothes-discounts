import React, { useState, useEffect, useRef, useCallback } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";

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
 * ハイライトする日付を取得する.
 */
async function fetchDate(itemId: number, signal: { signal: AbortSignal }) {
  const response = await fetch(`/api/limitedDiscounts/${itemId}`, {
    signal: signal.signal,
  });

  // TODO: APIから取得する
  return [itemId % 30];
}

type DiscountsCalenderProps = {
  itemId: number;
};

const DiscountsCalender = ({ itemId }: DiscountsCalenderProps) => {
  const requestAbortController = useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([] as number[]);

  const initialValue = dayjs();

  const fetchHighlightedDays = useCallback(() => {
    const controller = new AbortController();
    fetchDate(itemId, {
      signal: controller.signal,
    })
      .then((daysToHighlight) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  }, [itemId]);

  useEffect(() => {
    fetchHighlightedDays();
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, [fetchHighlightedDays]);

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={initialValue}
        loading={isLoading}
        onMonthChange={handleMonthChange}
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
