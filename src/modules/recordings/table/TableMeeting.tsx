"use client";

import { TableCustom } from "@/components/table/TableCustom";
import { columns } from "./Columns";
import { Meeting } from "@/interface/modules/meetings";

interface TableMeetingProps {
  data: Meeting[];
}

export function TableMeeting({ data }: TableMeetingProps) {
  return <TableCustom columns={columns} data={data} />;
}