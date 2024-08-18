import conn from "@/libs/mysql";
import { NextResponse } from "next/server";
import { OkPacket } from "mysql";
import { Recording } from "@/interface/modules/recordings";

export const GET = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const idmeeting = url.searchParams.get('idmeeting');

    if (!idmeeting) {
      return NextResponse.json({ message: 'Parámetros requeridos faltantes' }, { status: 400 });
    }

    const results: Recording[] = await conn.query(
      'SELECT * FROM recordings WHERE idmeeting = ? AND active = "S"',
      [idmeeting]
    );

    console.log('results recordings:::', results);
    return NextResponse.json(results);
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
    const {idmeeting, dateRecording, name, process} = await request.json();
    const result: OkPacket = await conn.query("INSERT INTO recordings  SET ?", {
      idmeeting,
      date_recording: dateRecording,
      name,
      process
    });
    console.log('result POST:::', result);
    return NextResponse.json({
      idmeeting,
      dateRecording,
      name,
      process,
      idrecording: result.insertId
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