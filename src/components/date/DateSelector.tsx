'use client';
import * as React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { CalendarIcon } from '@/assets/icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '../ui/calendar';

interface DateSelectorProps {
  onDatesChange: (startDate: Date | null, endDate: Date | null) => void;
  selectedDates: [Date | null, Date | null];
}

const DateSelector: React.FC<DateSelectorProps> = ({ onDatesChange, selectedDates }) => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: selectedDates[0] || undefined,
    to: selectedDates[1] || undefined,
  });

  const handleDateChange = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      setDateRange(range);
      onDatesChange(range.from, range.to);
    } else {
      setDateRange({ from: range?.from || dateRange?.from, to: range?.from || dateRange?.from });
      range?.from && onDatesChange(range?.from, range?.from);
    }
  };

  return (
    <div className="relative flex flex-row md:items-center mb-4">
      <div className='bg-ui-gray text-black flex items-center h-12 text-[16px] border-[1px] border-ui-gray w-28 pl-3 font-medium'>
        Fechas:
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full md:w-[300px] justify-start text-left font-normal rounded-none flex items-center h-12 relative border border-ui-gray"
          >
            
            {dateRange?.from ? (
              dateRange.to ? (
                `${format(dateRange.from, 'dd/MM/yyyy', { locale: es })} - ${format(dateRange.to, 'dd/MM/yyyy', { locale: es })}`

              ) : (
                format(dateRange.from, 'dd/MM/yyyy', { locale: es })
              )
            ) : (
              <span>Selecciona un rango de fechas</span>
            )}
            <CalendarIcon className="mr-2 absolute right-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            selected={dateRange}
            onSelect={handleDateChange}
            numberOfMonths={1}
            locale={es}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateSelector;