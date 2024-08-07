import { useEffect, useState } from 'react';
import { format } from 'date-fns';

interface FilterCriteria {
  dates: [Date | null, Date | null];
  searchValue: string;
}

export const useFilteredTableData = <T extends { dateMeeting: string; plate: string }>(
  data: T[],
  initialCriteria: FilterCriteria
) => {
  const [criteria, setCriteria] = useState<FilterCriteria>(initialCriteria);
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [loading, setLoading] = useState(true);

  const filterData = () => {
    const { dates, searchValue } = criteria;
    const filtered = data.filter(record => {
      const recordDate = record.dateMeeting;
      console.log('recordDate:::', recordDate);
      console.log('recordDate1:::', format(dates[0]!, 'yyyy-MM-dd'));
      console.log('recordDate2:::', format(dates[1]!, 'yyyy-MM-dd'));
      console.log('-------');
      
      
      const isWithinDateRange = recordDate >= format(dates[0]!, 'yyyy-MM-dd') && recordDate <= format(dates[1]!, 'yyyy-MM-dd');
      const matchesSearch = searchValue === '' || record.plate.toLowerCase().includes(searchValue.toLowerCase());

      return isWithinDateRange && matchesSearch;
    });
    setFilteredData(filtered);
    setLoading(false);
  };

  useEffect(() => {
    filterData();
  }, [criteria]);

  const updateCriteria = (newCriteria: Partial<FilterCriteria>) => {
    setCriteria(prev => ({ ...prev, ...newCriteria }));
  };

  return {
    filteredData,
    updateCriteria,
    loading
  };
};