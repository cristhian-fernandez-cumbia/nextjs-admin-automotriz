import React from 'react';
import { VideoBlocked, VideoPlay } from '@/assets/icons';

interface VideoPlayerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  capturing: boolean;
  videoBlob: Blob | null;
  videoUrl: string | null;
  isPlaying: boolean;
  onPlay: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoRef, capturing, videoBlob, videoUrl, isPlaying, onPlay }) => (
  <div className='sm:w-full h-auto bg-red-500 rounded-sm mb-5 relative'>
    {!capturing && !videoBlob && (
      <div className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white py-3'>
        <div className='flex flex-col items-center'>
          <VideoBlocked />
          <p className='text-center font-semibold text-base'>No hay video grabado</p>
        </div>
      </div>
    )}
    {!capturing && videoBlob && !isPlaying && (
      <div className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-100 text-white'>
        <div className='flex flex-col items-center'>
          <VideoPlay onClick={onPlay} className='z-10 hover:cursor-pointer' />
          <p className='text-center font-semibold text-base'>Video grabado</p>
        </div>
      </div>
    )}
    <video ref={videoRef} autoPlay muted className='w-full h-full'></video>
  </div>
);

export default VideoPlayer;
