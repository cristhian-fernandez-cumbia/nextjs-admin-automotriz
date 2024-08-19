"use client";
import { Meeting } from "@/interface/modules/meetings";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation"
import { useIsMobile } from '@/hooks/useIsMobile';

type ProcessColors = {
  'RECEPCIÓN'?: string;
  'MANT. MAYOR'?: string;
  'AFIN. ELECTRÓNICO'?: string;
  'ENTREGA'?: string;
};

export const columns: ColumnDef<Meeting>[] = [
  {
    accessorKey: "date_meeting",
    header: "Fecha Cita",
    cell: ({ row }) => {
      return row.original.date_meeting
    },
    meta: {
      visibleOnMobile: false,
      visibleOnDesktop: true,
    },
  },
  {
    accessorKey: "brand",
    header: "Marca",
    meta: {
      visibleOnMobile: false,
      visibleOnDesktop: true,
    },
  },
  {
    accessorKey: "model",
    header: "Modelo",
    meta: {
      visibleOnMobile: false,
      visibleOnDesktop: true,
    },
  },
  {
    accessorKey: "plate",
    header: "Placa",
    meta: {
      visibleOnMobile: true,
      visibleOnDesktop: true,
    },
  },
  {
    id: "phase",
    header: "Procesos",
    cell: ({ row }) => {
      const { recordings } = row.original;

      // Define colors for each process
      const processColors: ProcessColors = {
        'RECEPCIÓN': 'bg-green-600',
        'MANT. MAYOR': 'bg-green-600',
        'AFIN. ELECTRÓNICO': 'bg-green-600',
        'ENTREGA': 'bg-green-600'
      };

      const defaultColor = 'bg-gray-400';
      const processMap: ProcessColors = {};
      recordings?.forEach(recording => {
        const process = recording.process as keyof ProcessColors;
        if (processColors[process]) {
          processMap[process] = processColors[process];
        }
      });

      // Helper function to get color class
      const getColorClass = (process: string) => processMap[process as keyof ProcessColors] || defaultColor;

      return (
        <div className="flex flex-row gap-1 justify-center">
          <div className={`h-4 w-4 md:h-6 md:w-6 rounded-full ${getColorClass('RECEPCIÓN')} text-white flex justify-center items-center font-bold hover:cursor-pointer p-2 text-[11px] md:text-[14px]`}>
            R
          </div>
          <div className={`h-4 w-4 md:h-6 md:w-6 rounded-full ${getColorClass('MANT. MAYOR')} text-white flex justify-center items-center font-bold hover:cursor-pointer p-2 text-[11px] md:text-[14px]`}>
            M
          </div>
          <div className={`h-4 w-4 md:h-6 md:w-6 rounded-full ${getColorClass('AFIN. ELECTRÓNICO')} text-white flex justify-center items-center font-bold hover:cursor-pointer p-2 text-[11px] md:text-[14px]`}>
            A
          </div>
          <div className={`h-4 w-4 md:h-6 md:w-6 rounded-full ${getColorClass('ENTREGA')} text-white flex justify-center items-center font-bold hover:cursor-pointer p-2 text-[11px] md:text-[14px]`}>
            E
          </div>
        </div>
      );
    },
    meta: {
      visibleOnMobile: true,
      visibleOnDesktop: true,
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const idMeeting = row.original.idmeeting;
      return (
        <div className="flex flex-row justify-center">
          <ViewDetailsButton idMeeting={idMeeting} />
        </div>
      );
    },
    meta: {
      visibleOnMobile: true,
      visibleOnDesktop: true,
    },
  },
];

const ViewDetailsButton: React.FC<{ idMeeting: number }> = ({ idMeeting }) => {
  const router = useRouter();
  const isMobile = useIsMobile();

  const handleViewDetails = () => {
    router.push(`/grabaciones/${idMeeting}`);
  };

  return (
    <div
      onClick={handleViewDetails}
      className="py-2 px-3 bg-ui-red text-white hover:bg-red-700 hover:cursor-pointer font-semibold text-xs"
    >
      {
        isMobile ? 'Detalle' : 'Ver Detalle'
      }
    </div>
  );
};