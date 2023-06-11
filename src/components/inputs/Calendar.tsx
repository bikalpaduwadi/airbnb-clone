'use client';

import { FC } from 'react';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface CalendarProps {
  value: Range;
  disabledDates?: Date[];
  onChange: (value: RangeKeyDict) => void;
}

const Calendar: FC<CalendarProps> = ({ value, disabledDates, onChange }) => {
  return (
    <DateRange
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction='vertical'
      minDate={new Date()}
      showDateDisplay={false}
      rangeColors={['#262626']}
      disabledDates={disabledDates}
    />
  );
};

export default Calendar;
