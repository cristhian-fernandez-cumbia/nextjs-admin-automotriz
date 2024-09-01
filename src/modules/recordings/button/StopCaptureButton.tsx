import React from 'react';
import Button from '@/components/button/Button';
import { PauseCircle } from '@/assets/icons';

interface StopCaptureButtonProps {
  onClick: () => void;
}

const StopCaptureButton: React.FC<StopCaptureButtonProps> = ({ onClick }) => (
  <Button className='bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-white font-bold text-sm flex items-center justify-center w-28' onClick={onClick}>
    <PauseCircle className='mr-1' />
    DETENER
  </Button>
);

export default StopCaptureButton;
