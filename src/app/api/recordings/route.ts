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

    // Realizar la consulta
    const [results] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM recordings WHERE idmeeting = ? AND active = "S"',
      [idmeeting]
    );

    // Convertir los resultados a un tipo específico
    const formattedResults: Recording[] = results as Recording[];

    console.log('results recordings:::', formattedResults);
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
    const { idmeeting, dateRecording, name, process } = await request.json();

    // Realizar la inserción
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO recordings SET ?", {
        idmeeting,
        date_recording: dateRecording,
        name,
        process
      }
    );

    console.log('result POST:::', result);

    return NextResponse.json({
      idmeeting,
      dateRecording,
      name,
      process,
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
