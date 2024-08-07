'use client';
import React, { useState } from 'react';
import DateSelector from '@/components/date/DateSelector';
import SearchSelector from '@/components/search/SearchSelector';
import { format } from 'date-fns';
import { TableMeeting } from './TableMeeting';
import { useFilteredTableData } from '@/hooks/useFilteredTableData';

const Recordings: React.FC = () => {
  const today = new Date();
  const [dates, setDates] = useState<[Date | null, Date | null]>([today, today]);
  const [searchValue, setSearchValue] = useState('');

  const data = [
    {
      idMeeting: 1,
      brand: "Toyota",
      model: "RAV4",
      plate: "XYZ-123",
      dateMeeting: "2024-08-04",
      active: true,
    },
    {
      idMeeting: 2,
      brand: "Suzuki",
      model: "JIMNY",
      plate: "ABC-123",
      dateMeeting: "2024-08-07",
      active: true,
    },
    {
      idMeeting: 3,
      brand: "Subaru",
      model: "FORESTER",
      plate: "MNO-456",
      dateMeeting: "2024-08-07",
      active: true,
    },
    {
      idMeeting: 4,
      brand: "Subaru",
      model: "FORESTER",
      plate: "DEF-123",
      dateMeeting: "2024-08-08",
      active: true,
    },
    {
      idMeeting: 5,
      brand: "Toyota",
      model: "FORESTER",
      plate: "GHI-456",
      dateMeeting: "2024-08-08",
      active: true,
    }
  ];

  const { filteredData, updateCriteria, loading } = useFilteredTableData(data, { dates, searchValue });
  const handleDatesChange = (startDate: Date | null, endDate: Date | null) => {
    setDates([startDate, endDate]);
    // updateCriteria({ dates: [startDate, endDate] });
  };

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
    // updateCriteria({ searchValue: value });
  };

  const handleSearch = () => {
    console.log('Fechas seleccionadas:', formatDate(dates[0]), '-', formatDate(dates[1]));
    // console.log('Valor de búsqueda:', searchValue);
    updateCriteria({ searchValue: searchValue });
    updateCriteria({ dates: [dates[0], dates[1]] });
  };

  const formatDate = (date: Date | null) => date ? format(date, 'dd/MM/yyyy') : '';

  return (
    <div>
      <h1 className='text-black font-extrabold text-ui-panel-title dark:text-white mb-6'>GRABACIONES</h1>
      <div className='flex flex-col md:flex-row md:justify-between md:gap-4 mb-2'>
        <div className='flex flex-col md:flex-row md:gap-4'>
          <DateSelector onDatesChange={handleDatesChange} selectedDates={dates} />
          <SearchSelector onSearchValueChange={handleSearchValueChange} />
        </div>
        <button
          onClick={handleSearch}
          className="bg-ui-red text-white font-bold py-[11px] px-4 hover:bg-ui-red w-full md:w-auto mb-5"
        >
          BUSCAR
        </button>
      </div>
      <div>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <TableMeeting data={filteredData} />
        )}
      </div>
    </div>
  );
};

export default Recordings;