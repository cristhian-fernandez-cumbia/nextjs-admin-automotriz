import pool from "@/libs/mysql";
import { NextResponse } from "next/server";
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface Params {
  [key: string]: string;
}

interface Meeting {
  idmeeting: number;
  brand: string;
  model: string;
  plate: string;
  date_meeting: string;
}

export const GET = async (request: Request, { params }: { params: Params }) => {
  try {
    // Realizar la consulta
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM meetings WHERE idmeeting = ?', [params.idmeeting]
    );

    // Si no se encuentra ninguna cita
    if (rows.length === 0) {
      return NextResponse.json({ message: 'Cita no encontrada' }, { status: 404 });
    }

    // Formatear los resultados
    const formattedResults = rows.map(meeting => ({
      ...meeting,
      date_meeting: new Date(meeting.date_meeting).toISOString().split('T')[0]
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

export const POST = async () => {
  return NextResponse.json('Agregar cita');
};

export const PUT = async (request: Request, { params }: { params: Params }) => {
  try {
    const data = await request.json();

    // Realizar la actualización
    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE meetings SET ? WHERE idmeeting = ?', [data, params.idmeeting]
    );

    // Si no se encontró ninguna cita para actualizar
    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Cita no encontrada' }, { status: 404 });
    }

    // Obtener la cita actualizada
    const [updateMeeting] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM meetings WHERE idmeeting = ?', [params.idmeeting]
    );

    return NextResponse.json(updateMeeting);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Error desconocido' }, { status: 500 });
    }
  }
};

export const DELETE = async (request: Request, { params }: { params: Params }) => {
  try {
    // Realizar la eliminación
    const [result] = await pool.query<ResultSetHeader>(
      "DELETE FROM meetings WHERE idmeeting = ?", [params.idmeeting]
    );

    // Si no se encontró ninguna cita para eliminar
    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Cita no encontrada' }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Error desconocido' }, { status: 500 });
    }
  }
};
