import DatePicker, { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { forwardRef } from 'react';
import { format } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { locale } from '../../app/layout/App';
import ComponentWrapper from '../common/ComponentWrapper';
import { XIcon } from '@heroicons/react/outline';

interface Props {
  label: string;
  selectsStart?: boolean;
  selectsEnd?: boolean;
  startDate?: Date | null;
  endDate?: Date | null;
  minDate?: Date | null;
  initialDate?: Date | null | undefined;
  isClearable?: boolean;
  selectedDate: Date | null | undefined;
  onChange: (value: Date | null | undefined) => void;
}

export default function AppDatePicker(props: Props) {
  function handleOnChange(date: Date | null | undefined) {
    props.onChange(date);
  }

  return (
    <ComponentWrapper
      label={props.label}
      element={
        <DatePicker
          todayButton={
            <div className=' my-2 px-5'>
              <button className='w-full  rounded-md bg-yellow-500 py-1 px-2 font-Primary text-base font-thin uppercase text-stone-100'>
                aujourd’hui
              </button>
            </div>
          }
          locale={locale}
          placeholderText='Select date'
          shouldCloseOnSelect
          onChange={handleOnChange}
          selected={props.selectedDate}
          ref={null}
          isClearable={props.isClearable}
          selectsStart={props.selectsStart}
          selectsEnd={props.selectsEnd}
          minDate={props.minDate}
          startDate={props.startDate}
          endDate={props.endDate}
          customInput={<ButtonInput />}
          renderCustomHeader={(params) => <CustomHeader {...params} />}
        />
      }
      button={
        props.selectedDate && (
          <button
            type='button'
            onClick={() => handleOnChange(null)}
            className='h-full px-2 py-1'
          >
            <XIcon className='h-6 w-6 text-stone-600' />
          </button>
        )
      }
    />
  );
}

function CustomHeader({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps) {
  return (
    <div className='flex items-center justify-between px-2 py-2'>
      <span className='text-lg text-gray-700'>{format(date, 'PP')}</span>

      <div className='space-x-2'>
        <button
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          type='button'
          lang='fr'
          className={`${
            prevMonthButtonDisabled && 'cursor-not-allowed opacity-50'
          } 
                  inline-flex rounded border border-gray-300 bg-stone-200 p-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 `}
        >
          <ChevronLeftIcon className='h-5 w-5 text-gray-600' />
        </button>

        <button
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          type='button'
          className={` ${
            nextMonthButtonDisabled && 'cursor-not-allowed opacity-50'
          } inline-flex rounded border border-gray-300 bg-stone-200 p-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 `}
        >
          <ChevronRightIcon className='h-5 w-5 text-gray-600' />
        </button>
      </div>
    </div>
  );
}

const ButtonInput = forwardRef<HTMLButtonElement, any>((props, ref) => (
  <button
    ref={ref}
    onClick={props.onClick}
    type='button'
    className=' w-full gap-x-2 py-2 text-center font-Secondary outline-none focus:border-none focus:outline-none '
  >
    {props.value ? (
      <span>{format(new Date(props.value), 'P', { locale: locale })}</span>
    ) : (
      <span className='text-sm uppercase opacity-40'>aucune date</span>
    )}
  </button>
));
