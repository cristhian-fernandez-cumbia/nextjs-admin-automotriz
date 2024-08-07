"use client";

import { TableCustom } from "@/components/table/TableCustom";
import { Meeting, columns } from "./Columns";

interface TableMeetingProps {
  data: Meeting[];
}

export function TableMeeting({ data }: TableMeetingProps) {
  return <TableCustom columns={columns} data={data} />;
}