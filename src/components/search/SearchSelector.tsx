'use client';
import { IconCustomers } from '@/assets/icons';
import React, { useState } from 'react';

interface SearchSelectorProps {
  onSearchValueChange: (value: string) => void;
}

const SearchSelector: React.FC<SearchSelectorProps> = ({ onSearchValueChange }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    onSearchValueChange(event.target.value);
  };

  return (
    <div className='flex flex-row mb-4'>
      <div className='bg-ui-gray text-black flex items-center h-12 px-3 text-[16px] border-[1px] border-ui-gray w-24 font-medium'>
        Placa:
      </div>
      <div className='relative w-full'>
        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          className="px-4 border cursor-pointer border-ui-gray w-full md:w-auto md:pr-10 flex items-center h-12 focus:outline-none"
          placeholder="Placa"
        />
        <IconCustomers className='absolute right-2 md:right-6 top-3'/>
      </div>
    </div>
  );
}

export default SearchSelector;