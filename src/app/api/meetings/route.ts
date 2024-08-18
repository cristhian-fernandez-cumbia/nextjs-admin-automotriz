import { NextResponse } from "next/server";
import pool from "@/libs/mysql";
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface Meeting {
  idmeeting: number;
  brand: string;
  model: string;
  plate: string;
  date_meeting: string;
}

export const GET = async () => {
  try {
    // Realizar la consulta
    const [results] = await pool.query<RowDataPacket[]>('SELECT * FROM meetings WHERE active = "S"');

    // Convertir los resultados a Meeting[]
    const meetings: Meeting[] = results.map(row => ({
      idmeeting: row.idmeeting,
      brand: row.brand,
      model: row.model,
      plate: row.plate,
      date_meeting: row.date_meeting
    }));

    // Formatear la fecha
    const formattedResults = meetings.map(meeting => ({
      ...meeting,
      dateMeeting: new Date(meeting.date_meeting).toISOString().split('T')[0] 
    }));

    return NextResponse.json(formattedResults);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Error desconocido' }, { status: 500 });
    }
  }
};

export const POST = async (request: Request) => {
  try {
    const { brand, model, plate, dateMeeting } = await request.json();

    // Realizar la inserción
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO meetings (brand, model, plate, date_meeting) VALUES (?, ?, ?, ?)", 
      [brand, model, plate, dateMeeting]
    );

    // Obtener el ID insertado
    const insertId = result.insertId;

    return NextResponse.json({
      brand,
      model,
      plate,
      dateMeeting,
      id: insertId
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Error desconocido' }, { status: 500 });
    }
  }
};

export const PUT = async () => {
  return NextResponse.json('Actualizando citas');
};

export const DELETE = async () => {
  return NextResponse.json('Eliminado citas');
};