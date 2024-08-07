"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useIsMobile } from '@/hooks/useIsMobile';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function TableCustom<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const isMobile = useIsMobile();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="">
      <Table className="w-full">
        <TableHeader className="bg-[#3C3C3C]">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="flex">
              {headerGroup.headers.map((header) => {
                const columnMeta = header.column.columnDef.meta as {
                  visibleOnMobile: boolean;
                  visibleOnDesktop: boolean;
                };

                return (
                  <TableHead
                    key={header.id}
                    className={`text-white font-bold uppercase border border-white flex justify-center items-center ${
                      isMobile
                        ? columnMeta.visibleOnMobile
                          ? "flex-1 md:hidden"
                          : "hidden"
                        : columnMeta.visibleOnDesktop
                        ? "flex-1 md:flex"
                        : "hidden"
                    }`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="flex">
                {row.getVisibleCells().map((cell) => {
                  const columnMeta = cell.column.columnDef.meta as {
                    visibleOnMobile: boolean;
                    visibleOnDesktop: boolean;
                  };

                  return (
                    <TableCell
                      key={cell.id}
                      className={`uppercase bg-[#F0E5E5] border border-white text-black font-medium flex justify-center items-center ${
                        isMobile
                          ? columnMeta.visibleOnMobile
                            ? "flex-1 md:hidden"
                            : "hidden"
                          : columnMeta.visibleOnDesktop
                          ? "flex-1 md:flex"
                          : "hidden"
                      }`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No hay resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}