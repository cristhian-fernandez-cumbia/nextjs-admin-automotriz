import React from 'react';
import Button from '@/components/button/Button';
import { Trash } from '@/assets/icons';

interface DeleteVideoButtonProps {
  onClick: () => void;
}

const DeleteVideoButton: React.FC<DeleteVideoButtonProps> = ({ onClick }) => (
  <Button className='bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded-md text-white font-bold text-sm flex items-center justify-center w-12' onClick={onClick}>
    <Trash fill='#FFFFFF' className='scale-125' />
  </Button>
);

export default DeleteVideoButton;
