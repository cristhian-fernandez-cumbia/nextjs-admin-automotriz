import conn from "@/libs/mysql";
import { NextResponse } from "next/server";
import { OkPacket } from "mysql";
interface Meeting {
  idmeeting: number;
  brand: string;
  model: string;
  plate: string;
  date_meeting: string;
}
export const GET = async () => {
  try {
    const results: Meeting[] = await conn.query('SELECT * FROM meetings WHERE active = "S"')
    const formattedResults = results.map(meeting => ({
      ...meeting,
      dateMeeting: new Date(meeting.date_meeting).toISOString().split('T')[0] 
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

export const POST = async (request: any) => {
  try {
    const {brand,model,plate, dateMeeting} = await request.json();
    const result: OkPacket = await conn.query("INSERT INTO meetings  SET ?", {
      brand,
      model,
      plate,
      date_meeting: dateMeeting
    });
    return NextResponse.json({
      brand,
      model,
      plate,
      dateMeeting,
      id: result.insertId
    })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: error.message
      },{
        status: 500
      })
    }else {
      return NextResponse.json({
        message: 'Error desconocido'
      },{
        status: 500
      })
    }
  }
};

export const PUT = async () => {
  return NextResponse.json('Actualizando citas')
};

export const DELETE = async () => {
  return NextResponse.json('Eliminado citas')
};
