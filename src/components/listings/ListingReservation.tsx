'use client';

import { FC } from 'react';
import { Range, RangeKeyDict } from 'react-date-range';

import Button from '../Button';
import Calendar from '../inputs/Calendar';

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  isDisabled: boolean;
  disabledDates: Date[];
  onSubmit: () => void;
  onChangeDate: (value: Range) => void;
}

const ListingReservation: FC<ListingReservationProps> = ({
  price,
  onSubmit,
  dateRange,
  totalPrice,
  isDisabled,
  onChangeDate,
  disabledDates,
}) => {
  return (
    <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
      <div className='flex flex-row items-center gap-3 p-4'>
        <div className='text-2xl font-semibold'>$ {price}</div>
        <div className='font-light text-neutral-600'>night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value: RangeKeyDict) => onChangeDate(value.selection)}
      />
      <hr />
      <div className='p-4'>
        <Button disabled={isDisabled} label='Reserve' onClick={onSubmit} />
      </div>
      <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
