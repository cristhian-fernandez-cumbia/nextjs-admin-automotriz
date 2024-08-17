import conn from "@/libs/mysql";
import { NextResponse } from "next/server";
import { OkPacket } from "mysql";

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
    const result: Meeting[] = await conn.query(
      'SELECT * FROM meetings WHERE idmeeting = ?', [params.idmeeting]
    )
    if(result.length === 0) return NextResponse.json({message: 'Cita no encontrada'},{status: 404})
    const formattedResults = result.map(meeting => ({
      ...meeting,
      date_meeting: new Date(meeting.date_meeting).toISOString().split('T')[0] 
    }));

    return NextResponse.json(formattedResults);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({message: error.message},{status: 500})
    }else {
      return NextResponse.json({message: 'Error desconocido'},{status: 500})
    }
  }
};

export const POST = async () => {
  return NextResponse.json('Agregar cita')
};

export const PUT = async (request: Request, { params }: { params: Params }) => {
  try {
    const data = await request.json();
    const result:OkPacket = await conn.query(
      'UPDATE meetings SET ? WHERE idmeeting = ?' , [data, params.idmeeting]
    )
    if (result.affectedRows === 0) {
      return NextResponse.json({message: 'Cita no encontrada'},{status: 404})
    }

    const updateMeeting = await conn.query(
      'SELECT * FROM meetings WHERE idmeeting = ?', [params.idmeeting]
    )
    return NextResponse.json(updateMeeting)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({message: error.message},{status: 500})
    }else {
      return NextResponse.json({message: 'Error desconocido'},{status: 500})
    }
  }
};

export const DELETE = async (request: Request, { params }: { params: Params }) => {
  try {
    const result:OkPacket =  await conn.query(
      "DELETE FROM meetings WHERE idmeeting = ?" , [
        params.idmeeting
      ]
    )
    if (result.affectedRows === 0) {
      return NextResponse.json({message: 'Cita no encontrada'},{status: 404})
    }
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({message: error.message},{status: 500})
    }else {
      return NextResponse.json({message: 'Error desconocido'},{status: 500})
    }
  }
};
