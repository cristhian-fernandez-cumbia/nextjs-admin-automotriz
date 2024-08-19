"use client";
import { Meeting } from "@/interface/modules/meetings";
import { ColumnDef } from "@tanstack/react-table";
import { format, parseISO  } from 'date-fns';
import { useRouter } from "next/navigation"
import { useIsMobile } from '@/hooks/useIsMobile';

export const columns: ColumnDef<Meeting>[] = [
  {
    accessorKey: "dateMeeting",
    header: "Fecha Cita",
    cell: ({ row }) => {
      const dateMeeting = row.original.date_meeting;
      const dateObject = parseISO(dateMeeting);
      return format(dateObject!, 'yyyy-MM-dd')
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
    cell: () => (
      <div className="flex flex-row gap-1 justify-center">
        <div className="h-4 w-4 md:h-6 md:w-6 rounded-full bg-green-600 text-white flex justify-center items-center font-bold hover:cursor-pointer p-2 text-[11px] md:text-[14px]">R</div>
        <div className="h-4 w-4 md:h-6 md:w-6 rounded-full bg-gray-400 text-gray-600 flex justify-center items-center font-bold hover:cursor-pointer p-2 text-[11px] md:text-[14px]">M</div>
        <div className="h-4 w-4 md:h-6 md:w-6 rounded-full bg-gray-400 text-gray-600 flex justify-center items-center font-bold hover:cursor-pointer p-2 text-[11px] md:text-[14px]">A</div>
        <div className="h-4 w-4 md:h-6 md:w-6 rounded-full bg-gray-400 text-gray-600 flex justify-center items-center font-bold hover:cursor-pointer p-2 text-[11px] md:text-[14px]">E</div>
      </div>
    ),
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