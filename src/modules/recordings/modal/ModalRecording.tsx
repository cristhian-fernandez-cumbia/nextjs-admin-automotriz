import Button from '@/components/button/Button';
import { ModalRecordingProps } from '@/interface/modules/recordings';
import { formatDateTime, generateFileName } from '@/utils/functions';
import React, { useCallback, useRef, useState } from 'react';
import { useToast } from "@/components/ui/use-toast"; 
import { Camera, ChangeIcon, PauseCircle, PlayCircle, Spin, Trash, VideoPlay, VideoBlocked } from '@/assets/icons';
import { RecordRTCPromisesHandler } from 'recordrtc';

const ModalRecording: React.FC<ModalRecordingProps> = ({ process, idmeeting, plate, onClose, fetchRecordings }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [capturing, setCapturing] = useState(false);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const recorderRef = useRef<RecordRTCPromisesHandler | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const changeCamera = () => {
    setFacingMode(facingMode === "user" ? "environment" : "user");
  };

  const handleStartCaptureClick = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode },
        audio: true,
      });

      videoRef.current!.srcObject = stream;
      recorderRef.current = new RecordRTCPromisesHandler(stream, {
        type: 'video',
        mimeType: 'video/webm',
      });

      await recorderRef.current.startRecording();
      setCapturing(true);
      setVideoBlob(null); // Limpiar el videoBlob anterior
      setVideoUrl(null);  // Limpiar la URL del video anterior
    } catch (error) {
      console.error('Error al iniciar la captura:', error);
    }
  }, [facingMode]);

  const handleStopCaptureClick = useCallback(async () => {
    if (recorderRef.current) {
      await recorderRef.current.stopRecording();
      const blob = await recorderRef.current.getBlob();
      setVideoBlob(blob);
      setVideoUrl(URL.createObjectURL(blob)); // Crear URL para previsualización
      setCapturing(false);

      const stream = videoRef.current!.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current!.srcObject = null;
    }
  }, []);

  const handlePlayVideo = useCallback(() => {
    if (videoRef.current && videoUrl) {
      videoRef.current.src = videoUrl;
      videoRef.current.controls = true;
      videoRef.current.muted = false; // Activar el audio
      videoRef.current.play();
      setIsPlaying(true); 
    }
  }, [videoUrl]);

  const handleDeleteVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.src = ''; // Limpiar el video
      videoRef.current.controls = false;
      videoRef.current.muted = true; // Desactivar el audio
    }
    setVideoBlob(null); // Limpiar el videoBlob
    setVideoUrl(null);  // Limpiar la URL del video
  }, []);

  const handleUploadVideoServer = useCallback(async () => {
    if (videoBlob) {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('file', videoBlob, generateFileName(process));
      
      const today = new Date();
      const data = {
        idmeeting,
        dateRecording: formatDateTime(today),
        nameRecording: generateFileName(process),
        process,
      };

      try {
        const response = await fetch('/api/recordings', {
          method: 'POST',
          body: JSON.stringify(data),
        });

        if (response.ok) {
          console.log('Video subido exitosamente');
          
          // Descargar el video
          const url = window.URL.createObjectURL(videoBlob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', generateFileName(process) + ".webm");
          document.body.appendChild(link);
          link.click();
          link.remove();

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
  }, [videoBlob, idmeeting, process, toast]);

  return (
    <div className='text-black max-w-96'>
      <div className='flex flex-row items-center gap-1 mb-2'>
        <div className='w-2 h-2 bg-ui-red rounded-full'></div>
        <h2 className='font-bold uppercase'>Grabación - {process}</h2>
      </div>
      <div className='flex flex-row justify-between items-center mb-[14px]'>
        <div className='flex flex-row justify-between'>
          <h3 className='font-bold uppercase bg-ui-gray-light py-1 px-3 text-sm rounded-md'>Placa: {plate}</h3>
        </div>
        <Button className='bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-md text-white font-bold flex justify-center items-center' onClick={changeCamera}>
          <ChangeIcon className='mr-2'/> <Camera className='scale-150'/>
        </Button>
      </div>
      <div className='sm:w-full h-auto bg-red-500 rounded-sm mb-5 relative'>
        {
          !capturing && !videoBlob && (
            <div className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white py-3'>
              <div className='flex flex-col items-center'>
                <VideoBlocked/>
                <p className='text-center font-semibold text-base'>No hay video grabado</p>
              </div>
            </div>
          )
        }
        {
          !capturing && videoBlob && !isPlaying &&(
            <div className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-100 text-white' >
              <div className='flex flex-col items-center' >
                <VideoPlay onClick={handlePlayVideo} className='z-10 hover:cursor-pointer'/>
                <p className='text-center font-semibold text-base'>Video grabado</p>
              </div>
            </div>
          )
        }
        <video ref={videoRef} autoPlay muted className='w-full h-full'></video>
      </div>
      <div className='flex flex-row justify-between mb-5'>
        {!capturing && !videoBlob && (
          <Button className='bg-green-600 hover:bg-green-700 px-2 py-2 rounded-md text-white font-bold text-sm flex items-center justify-center w-28' onClick={handleStartCaptureClick}>
            <PlayCircle className='mr-1'/>
            INICIAR
          </Button>
        )}
        {capturing && (
          <Button className='bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-white font-bold text-sm flex items-center justify-center w-28' onClick={handleStopCaptureClick}>
            <PauseCircle className='mr-1'/>
            DETENER
          </Button>
        )}
        {!capturing && videoBlob && (
          <>
            {/* <Button className='bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-white font-bold text-sm flex items-center justify-center w-12' onClick={handlePlayVideo}>
              <PlayCircle/>
            </Button> */}
            <Button className='bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded-md text-white font-bold text-sm flex items-center justify-center w-12' onClick={handleDeleteVideo}>
              <Trash fill='#FFFFFF' className='scale-125'/>
            </Button>
            <Button className='bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-white font-bold text-sm' onClick={handleUploadVideoServer} disabled={isLoading}>
              {isLoading ? (
                <div className='flex items-center justify-center'>
                  <Spin/>
                  CARGANDO...
                </div>
              ) : 'CARGAR VIDEO'}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default ModalRecording;