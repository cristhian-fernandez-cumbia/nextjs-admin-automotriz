import { useCallback, useEffect, useRef, useState } from 'react';
import { RecordRTCPromisesHandler } from 'recordrtc';

export const useVideoRecorder = (facingMode: 'user' | 'environment', onClose: { (): void }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const recorderRef = useRef<RecordRTCPromisesHandler | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const startCapture = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
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

  const stopCapture = useCallback(async () => {
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

  const playVideo = useCallback(() => {
    if (videoRef.current && videoUrl) {
      videoRef.current.src = videoUrl;
      videoRef.current.controls = true;
      videoRef.current.muted = false;
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [videoUrl]);

  const deleteVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.src = '';
      videoRef.current.controls = false;
      videoRef.current.muted = true;
    }
    setVideoBlob(null);
    setVideoUrl(null);
  }, []);

  const onCloseModalRecording = () => {
    stopCamera();
    onClose();
  }

  return {
    videoRef,
    capturing,
    videoBlob,
    videoUrl,
    isPlaying,
    startCapture,
    stopCapture,
    playVideo,
    deleteVideo,
    onCloseModalRecording
  };
};
