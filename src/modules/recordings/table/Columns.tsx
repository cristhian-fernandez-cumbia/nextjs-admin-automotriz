"use client";
import { Meeting } from "@/interface/modules/meetings";
import { ColumnDef } from "@tanstack/react-table";
import { format, parseISO  } from 'date-fns';
import { useRouter } from "next/navigation"

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
    header: "Fases",
    cell: () => (
      <div className="flex flex-row gap-1 justify-center flex-wrap">
        <div className="h-6 w-6 rounded-full bg-green-600 text-white flex justify-center items-center font-semibold hover:cursor-pointer">R</div>
        <div className="h-6 w-6 rounded-full bg-gray-400 text-gray-600 flex justify-center items-center font-semibold hover:cursor-pointer">M</div>
        <div className="h-6 w-6 rounded-full bg-gray-400 text-gray-600 flex justify-center items-center font-semibold hover:cursor-pointer">A</div>
        <div className="h-6 w-6 rounded-full bg-gray-400 text-gray-600 flex justify-center items-center font-semibold hover:cursor-pointer">E</div>
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

  const handleViewDetails = () => {
    router.push(`/grabaciones/${idMeeting}`);
  };

  return (
    <div
      onClick={handleViewDetails}
      className="py-2 px-3 bg-ui-red text-white hover:bg-red-700 hover:cursor-pointer font-semibold text-xs"
    >
      Ver Detalle
    </div>
  );
};