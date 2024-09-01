import React, { useState } from 'react';
import { ModalRecordingProps } from '@/interface/modules/recordings';
import { useVideoRecorder } from '@/hooks/useVideoRecorder';
import { useUploadVideo } from '@/hooks/useUploadVideo';
import { Camera, ChangeIcon, CloseIcon } from '@/assets/icons';
import VideoPlayer from '../video/VideoPlayer';
import UploadVideoButton from '../button/UploadVideoButton';
import DeleteVideoButton from '../button/DeleteVideoButton';
import StopCaptureButton from '../button/StopCaptureButton';
import StartCaptureButton from '../button/StartCaptureButton';
import Button from '@/components/button/Button';

const ModalRecording: React.FC<ModalRecordingProps> = ({ process, idmeeting, plate, onClose, fetchRecordings }) => {
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const {
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
  } = useVideoRecorder(facingMode, onClose);

  const { uploadVideo, isLoading } = useUploadVideo(process, idmeeting, plate, onClose, fetchRecordings);

  const changeCamera = () => {
    setFacingMode(facingMode === 'user' ? 'environment' : 'user');
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='absolute inset-0 bg-black bg-opacity-50'></div>
      <div className='relative bg-white rounded-md shadow-lg p-6 w-[90%] max-w-[600px] mx-auto -top-12'>
        <div className='flex items-center justify-between'>
          <h2 className='font-bold uppercase text-2xl text-red-600 mb-1'>Grabación - {process}</h2>
          <button className='ml-2 text-red-600' onClick={onCloseModalRecording}>
            <CloseIcon fill='#EF4444' />
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
        <div className='text-center'>
          <VideoPlayer videoRef={videoRef} capturing={capturing} videoBlob={videoBlob} videoUrl={videoUrl} isPlaying={isPlaying} onPlay={playVideo} />
          <div className='flex justify-center space-x-4'>
            {!capturing && !videoBlob && (
              <StartCaptureButton onClick={startCapture} />
            )}
            {capturing && (
              <StopCaptureButton onClick={stopCapture} />
            )}
            {!capturing && videoBlob && (
              <>
                <DeleteVideoButton onClick={deleteVideo} />
                <UploadVideoButton onClick={() => uploadVideo(videoBlob)} isLoading={isLoading} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalRecording;