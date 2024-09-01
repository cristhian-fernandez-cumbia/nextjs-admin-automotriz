import React from 'react';
import Button from '@/components/button/Button';
import { PlayCircle } from '@/assets/icons';

interface StartCaptureButtonProps {
  onClick: () => void;
}

const StartCaptureButton: React.FC<StartCaptureButtonProps> = ({ onClick }) => (
  <Button className='bg-green-600 hover:bg-green-700 px-2 py-2 rounded-md text-white font-bold text-sm flex items-center justify-center w-28' onClick={onClick}>
    <PlayCircle className='mr-1' />
    INICIAR
  </Button>
);

export default StartCaptureButton;
