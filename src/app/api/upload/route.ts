import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const video = formData.get('video') as File | null;

    if (!video) return NextResponse.json({ message: 'Video no cargado' }, { status: 400 });
    const arrayBuffer = await video.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: `videos/${video.name}`,
      Body: buffer,
      ContentType: video.type,
    });

    const response = await s3Client.send(command);
    console.log('response:::', response);
    if (response.$metadata.httpStatusCode !== 200) {
      throw new Error('Error en la carga del video a AWS S3');
    }
    const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/videos/${video.name}`;
    return NextResponse.json({ fileUrl });
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    return NextResponse.json({ message: 'Error al subir el archivo' }, { status: 500 });
  }
}
