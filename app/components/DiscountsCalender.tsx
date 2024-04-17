import React from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

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
const fetchDates = async (itemId: number) => {
  // APIからデータ取得
  return []
}

const DiscountsCalender = ({ itemId }: { itemId: number }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

  // TODO: APIから日付データを取得する
  // TODO: ハイライト日付に値をいれる

  /**
   * 月を変更したときの処理.
   */
  const handleMonthChange = (date: Dayjs) => {
    console.log("月を変更：" + date.format('YYYY-MM'));
    console.log("年：" + date.year());
    console.log("月：" + (date.month() + 1));

    setIsLoading(true);
    setHighlightedDays([]);
    // TODO: ハイライト日付に変更後の年月の値を入れる
    setHighlightedDays([1, 2, 15]);
    setIsLoading(false);
  };

  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
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
  )
}

export default DiscountsCalender
