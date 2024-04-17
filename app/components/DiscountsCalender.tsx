import React from "react";
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
  // TODO: APIからデータ取得
  return {
    2023: {
      1: [1, 2, 3],
      4: [1, 2, 3],
    },
  };
};

const DiscountsCalender = ({ itemId }: { itemId: number }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
  const [dates, setDates] = React.useState({} as CalenderDates);

  React.useEffect(() => {
    (async () => {
      const data = await fetchDates(itemId);
      setDates(data);
      setHighlightedDays(pickHighlightedDays(dayjs()));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);

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
