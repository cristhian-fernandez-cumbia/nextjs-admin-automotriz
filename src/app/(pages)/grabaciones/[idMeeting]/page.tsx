'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Meeting } from '@/interface/modules/meetings';
import RecordingMeeting from '@/modules/recordings/RecordingMeeting';

const RecordingMeetingPage = () => {
  const pathname = usePathname();
  const idMeeting = pathname.split('/').pop() || '0';
  const [meeting, setMeeting] = useState<Meeting | null>(null);

  useEffect(() => {
    if (idMeeting) {
      const fetchMeeting = async () => {
        const response = await fetch(`/api/meetings/${idMeeting}`);
        if (!response.ok) throw new Error('Error fetching meeting data');
        const data: Meeting[] = await response.json();
        const dataFilter = data.find(row => row.idmeeting === Number(idMeeting));
        if (dataFilter) {
          setMeeting(dataFilter);
        } else {
          setMeeting(null);
        }
      };

      fetchMeeting();
    }
  }, [idMeeting]);

  if (!meeting) return (
    <div className='flex justify-center items-center'>
      <span className="loader"></span>
    </div>
  );
  
  return (
    <RecordingMeeting meeting={meeting}/>
  );
}

export default RecordingMeetingPage;