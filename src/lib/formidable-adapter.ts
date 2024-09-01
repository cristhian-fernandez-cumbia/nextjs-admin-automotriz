// lib/formidable-adapter.ts
import { IncomingForm } from "formidable";
import { NextRequest } from "next/server";
import { Readable } from "stream";

export function parseForm(req: NextRequest): Promise<{ fields: any, files: any }> {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();
    const stream = Readable.from(req.clone().arrayBuffer());

    form.parse(stream, (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      resolve({ fields, files });
    });
  });
}