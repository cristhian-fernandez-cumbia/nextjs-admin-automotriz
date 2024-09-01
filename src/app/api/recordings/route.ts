import pool from "@/libs/mysql";
import { NextResponse } from "next/server";
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { Recording } from "@/interface/modules/recordings";

export const GET = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const idmeeting = url.searchParams.get('idmeeting');

    if (!idmeeting) {
      return NextResponse.json({ message: 'Parámetros requeridos faltantes' }, { status: 400 });
    }

    const [results] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM recordings WHERE idmeeting = ? AND active = "S"',
      [idmeeting]
    );
    const formattedResults: Recording[] = results as Recording[];
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
    const body = await request.json();
    const { idmeeting, dateRecording, nameRecording, process,urlRecording } = body;

    if (!idmeeting || !dateRecording || !nameRecording || !process  || !urlRecording) {
      return NextResponse.json({ message: 'Faltan parámetros requeridos' }, { status: 400 });
    }
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO recordings (idmeeting, date_recording, name_recording, process, url_recording) VALUES (?, ?, ?, ?, ?)",
      [idmeeting, dateRecording, nameRecording, process, urlRecording]
    );
    return NextResponse.json({
      idmeeting,
      dateRecording,
      nameRecording,
      process,
      urlRecording,
      idrecording: result.insertId
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Error desconocido' }, { status: 500 });
    }
  }
};

export const DELETE = async (request: Request) => {
  try {
    const body = await request.json();
    const { idrecording } = body;

    if (!idrecording) {
      return NextResponse.json({ message: 'Parámetro idrecording requerido' }, { status: 400 });
    }

    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE recordings SET active = 'N' WHERE idrecording = ?",
      [idrecording]
    );
    
    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Registro no encontrado o no actualizado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Registro actualizado correctamente' });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Error desconocido' }, { status: 500 });
    }
  }
};
