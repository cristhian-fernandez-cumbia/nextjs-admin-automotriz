import Button from '@/components/button/Button';
import { ModalRecordingProps } from '@/interface/modules/recordings';
import { formatDateTime, generateFileName } from '@/utils/functions';
import React, { useCallback, useRef, useState } from 'react';
import { useToast } from "@/components/ui/use-toast"; 
import Webcam from 'react-webcam';
import { Camera, ChangeIcon, PauseCircle, PlayCircle, Spin } from '@/assets/icons';

const ModalRecording: React.FC<ModalRecordingProps> = ({ process, idmeeting, plate, onClose, fetchRecordings }) => {
  const webcamRef = useRef<Webcam | null>(null);
  const [facingMode, setFacingMode] =  useState<"user" | "environment">("environment")
  const [capturing, setCapturing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([])
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
    console.log('handleStartCaptureClick:::', handleStartCaptureClick);
    if (webcamRef.current && webcamRef.current.stream) {
      setRecordedChunks([])
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
       mimeType: "video/webm"
      });
      mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
      mediaRecorderRef.current.start();

      console.log('recordedChunks 1:::', recordedChunks);
    }
  }, [webcamRef, handleDataAvailable]);
  
  const handleStopCaptureClick = useCallback(() => {
    console.log('mediaRecorderRef:::', mediaRecorderRef);
    if (mediaRecorderRef.current) {
      console.log('entro a mediaRecorderRef.current:::');
      mediaRecorderRef.current.stop();
      console.log('recordedChunks 2:::', recordedChunks);
      setCapturing(false);
    }
  }, [webcamRef]);

  const handleUploadVideoServer = useCallback(async () => {
    if (recordedChunks.length) {
      setIsLoading(true);
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const formData = new FormData();
      formData.append('file', blob, generateFileName(process));
      formData.forEach((value, key) => {
        console.log(`${key}:::>>`, value);
      });
      const today = new Date();
      const data = {
        idmeeting,
        dateRecording:formatDateTime(today),
        nameRecording: generateFileName(process),
        process
      }
      try {
        const response = await fetch('/api/recordings', {
          method: 'POST',
          body: JSON.stringify(data),
        });
        if (response.ok) {
          console.log('Video subido exitosamente');
          // Descargar el video
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', generateFileName(process) + ".webm");
          document.body.appendChild(link);
          link.click();
          link.remove();
          // ++++++
          onClose();
          fetchRecordings();
        } else {
          console.error('Error al subir el video');
          toast({
            title: "Error al subir el video",
            description: "Hubo un error al subir el video.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error de red:', error);
        toast({
          title: "Error de red",
          description: "No se pudo conectar al servidor.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  }, [recordedChunks, idmeeting, plate, process, toast]);
  
  return (
    <div className='text-black max-w-96'>
      <div className='flex flex-row items-center gap-1 mb-2'>
        <div className='w-2 h-2 bg-ui-red rounded-full'></div>
        <h2 className='font-bold uppercase'>Grabación  - {process}</h2>
      </div>
      <div className='flex flex-row justify-between items-center mb-[14px] '>
        <div className='flex flex-row justify-between'>
          <h3 className='font-bold uppercase bg-ui-gray-light py-1 px-3 text-sm rounded-md'>Placa: {plate}</h3>
        </div>
        <Button className='bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-md text-white font-bold flex justify-center items-center' onClick={changeCamera}>
          <ChangeIcon className='mr-2'/> <Camera className='scale-150'/>
        </Button>
      </div>
      <div className='sm:w-full h-[calc(100vh-4rem)] sm:h-full bg-red-500 rounded-sm mb-5'>
        <Webcam 
          audio={true}
          ref={webcamRef}
          videoConstraints={{
            // height: 1080,
            // width: 1920,
            height: 720,
            width: 1280,
            facingMode: facingMode
          }}
          muted={true}
        />
      </div>
      <div className='flex flex-row justify-between mb-5'>
        {
          capturing ? (
            <Button className='bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-white font-bold text-sm flex items-center justify-center w-28' onClick={handleStopCaptureClick}>
              <PauseCircle className='mr-1'/>
              DETENER
            </Button>) : (
            <Button className='bg-green-600 hover:bg-green-700 px-2 py-2 rounded-md text-white font-bold text-sm flex items-center justify-center w-28' onClick={handleStartCaptureClick}>
              <PlayCircle className='mr-1'/>
              INICIAR
            </Button> )
        }
        {
          recordedChunks.length> 0 && (
            <Button className='bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-white font-bold text-sm' onClick={handleUploadVideoServer} disabled={isLoading}>
              {isLoading ? (
                <div className='flex items-center justify-center'>
                  <Spin/>
                  CARGANDO...
                </div>
              ) : 'CARGAR VIDEO'}
            </Button>
          )
        }
      </div>
    </div>
  )
}

export default ModalRecording