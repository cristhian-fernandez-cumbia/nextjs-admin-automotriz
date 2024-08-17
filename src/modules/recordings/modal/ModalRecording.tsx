import Button from '@/components/button/Button';
import { ModalRecordingProps } from '@/interface/modules/recordings';
import { generateFileName } from '@/utils/functions';
import React, { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam';

const ModalRecording: React.FC<ModalRecordingProps> = ({ process, idmeeting, plate }) => {
  const webcamRef = useRef<Webcam | null>(null);
  const [facingMode, setFacingMode] =  useState<"user" | "environment">("environment")
  const [capturing, setCapturing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([])

  const changeCamera = () => {
    setFacingMode(facingMode==="user" ? "environment" : "user")
  }
  const handleDataAvailable = useCallback(
    (event: BlobEvent) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => prev.concat(event.data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = useCallback(() => {
    if (webcamRef.current && webcamRef.current.stream) {
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
       mimeType: "video/webm"
      });
      mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
      mediaRecorderRef.current.start();
    }
  }, [webcamRef, handleDataAvailable]);
  
  const handleStopCaptureClick = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }
  }, [webcamRef]);

  const handleDownloadVideo = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      document.body.appendChild(a);
      a.href = url;
      a.download = generateFileName(process);
      a.click();

      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks, idmeeting, plate, process]);
  
  return (
    <div className='text-black'>
      <div className='flex flex-row items-center gap-1 mb-2'>
        <div className='w-2 h-2 bg-ui-red rounded-full'></div>
        <h2 className='font-bold uppercase'>Grabación  - {process}</h2>
      </div>
      <div className='mb-[14px] flex flex-row'>
        <h3 className='font-bold uppercase bg-ui-gray-light py-1 px-3 text-sm '>Placa: {plate}</h3>
      </div>
      <div className='sm:w-full sm:h-full bg-red-500 rounded-sm mb-5'>
        <Webcam 
          audio={true}
          ref={webcamRef}
          videoConstraints={{
            height: 1080,
            width: 1920,
            facingMode: facingMode
          }}
        />
      </div>
      <div className='flex flex-row justify-between mb-5'>
        {
          capturing ? (
            <Button className='bg-red-600 hover:bg-red-700 px-5 py-2 rounded-md text-white font-bold' onClick={handleStopCaptureClick}>
              DETENER GRABACIÓN
            </Button>) : (
            <Button className='bg-green-600 hover:bg-green-700 px-5 py-2 rounded-md text-white font-bold' onClick={handleStartCaptureClick}>
              INICIAR GRABACIÓN
            </Button> )
        }
        {
          recordedChunks.length> 0 && (
            <Button className='bg-red-600 hover:bg-red-700 px-5 py-2 rounded-md text-white font-bold' onClick={handleDownloadVideo}>
              DESCARGAR VIDEO
            </Button>
          )
        }
        <Button className='bg-red-600 hover:bg-red-700 px-5 py-2 rounded-md text-white font-bold' onClick={changeCamera}>
          CAMBIAR CAMARA
        </Button>
      </div>
    </div>
  )
}

export default ModalRecording