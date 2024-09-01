import React, { useCallback, useRef, useState, useEffect } from 'react';
import Button from '@/components/button/Button';
import { ModalRecordingProps } from '@/interface/modules/recordings';
import { formatDateTime, generateFileName } from '@/utils/functions';
import { useToast } from "@/components/ui/use-toast"; 
import { Camera, ChangeIcon, PauseCircle, PlayCircle, Spin, Trash, VideoPlay, VideoBlocked, CloseIcon } from '@/assets/icons';
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

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => {
        track.stop();
      });
      videoRef.current.srcObject = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      console.log('stopCamera:::');
      stopCamera();
    };
  }, [stopCamera]);

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
      setVideoBlob(null); 
      setVideoUrl(null);  
    } catch (error) {
      console.error('Error al iniciar la captura:', error);
    }
  }, [facingMode]);

  const handleStopCaptureClick = useCallback(async () => {
    if (recorderRef.current) {
      await recorderRef.current.stopRecording();
      const blob = await recorderRef.current.getBlob();
      setVideoBlob(blob);
      setVideoUrl(URL.createObjectURL(blob));
      setIsPlaying(false);
      setCapturing(false);
      stopCamera();
    }
  }, [stopCamera]);

  const handlePlayVideo = useCallback(() => {
    if (videoRef.current && videoUrl) {
      videoRef.current.src = videoUrl;
      videoRef.current.controls = true;
      videoRef.current.muted = false;
      videoRef.current.play();
      setIsPlaying(true); 
    }
  }, [videoUrl]);

  const handleDeleteVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.src = '';
      videoRef.current.controls = false;
      videoRef.current.muted = true; 
    }
    setVideoBlob(null); 
    setVideoUrl(null);  
  }, []);

  const handleUploadVideoServer = useCallback(async () => {
    if (videoBlob) {
      setIsLoading(true);

      const formData = new FormData();
      const fileName = generateFileName(process);
      formData.append('video', videoBlob, fileName);
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!uploadResponse.ok) {
        throw new Error('Error al subir el video a S3');
      }
      const { fileUrl } = await uploadResponse.json();
      const today = new Date();
      const data = {
        idmeeting,
        dateRecording: formatDateTime(today),
        nameRecording: fileName,
        process,
        urlRecording: fileUrl
      };

      try {
        const response = await fetch('/api/recordings', {
          method: 'POST',
          body: JSON.stringify(data),
        });

        if (response.ok) {
          toast({
            title: "Video subido y guardado",
            description: "El video ha sido subido y guardado exitosamente.",
          });
          stopCamera();
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
        stopCamera(); 
      }
    }
  }, [videoBlob, idmeeting, process, toast, stopCamera]);

  const onCloseModalRecording = () => {
    stopCamera();
    onClose();
  }

  return (
    <div className='text-black max-w-96'>
      <div className='flex flex-row items-center gap-1 mb-2'>
        <div className='w-2 h-2 bg-ui-red rounded-full'></div>
        <h2 className='font-bold uppercase'>Grabación - {process}</h2>
        <button className='closeButton' onClick={onCloseModalRecording}>
          <CloseIcon />
        </button>
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