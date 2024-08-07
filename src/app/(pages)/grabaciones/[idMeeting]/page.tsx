'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Meeting {
  idMeeting: number;
  brand: string;
  model: string;
  plate: string;
  dateMeeting: string;
  active: boolean;
}

const GrabacionesMeetingPage = () => {
  const pathname = usePathname();
  const idMeeting = pathname.split('/').pop() || '0';
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const router = useRouter(); // Hook para la navegación

  const data: Meeting[] = [
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

  useEffect(() => {
    if (idMeeting) {
      const fetchMeeting = async () => {
        // Simula la obtención de datos
        // const response = await fetch(`/api/meetings/${idMeeting}`);
        // const data = await response.json();
        
        // Encuentra la reunión en los datos
        const dataFilter = data.find(row => row.idMeeting === Number(idMeeting));
        
        // Actualiza el estado si dataFilter no es undefined
        if (dataFilter) {
          setMeeting(dataFilter);
        } else {
          // Maneja el caso en que no se encuentra la reunión
          setMeeting(null);
        }
      };

      fetchMeeting();
    }
  }, [idMeeting]);

  if (!meeting) return <p>Loading...</p>;

  return (
    <div>
      <h1 className='text-black font-extrabold text-ui-panel-title dark:text-white mb-6'>CITA #{idMeeting}</h1>
      <div>
        <h1>Detalles de la Reunión</h1>
        <p><strong>Marca:</strong> {meeting.brand}</p>
        <p><strong>Modelo:</strong> {meeting.model}</p>
        <p><strong>Placa:</strong> {meeting.plate}</p>
        <p><strong>Fecha de Cita:</strong> {meeting.dateMeeting}</p>
        {/* Otros detalles */}
      </div>
      <button
        onClick={() => router.back()}
        className="mt-4 bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600"
      >
        Regresar
      </button>
    </div>
  );
}

export default GrabacionesMeetingPage;