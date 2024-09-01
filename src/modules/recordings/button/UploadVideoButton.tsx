import React from 'react';
import Button from '@/components/button/Button';
import { Spin } from '@/assets/icons';

interface UploadVideoButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

const UploadVideoButton: React.FC<UploadVideoButtonProps> = ({ onClick, isLoading }) => (
  <Button className='bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-white font-bold text-sm' onClick={onClick} disabled={isLoading}>
    {isLoading ? (
      <div className='flex items-center justify-center'>
        <Spin />
        CARGANDO...
      </div>
    ) : 'CARGAR VIDEO'}
  </Button>
);

export default UploadVideoButton;
