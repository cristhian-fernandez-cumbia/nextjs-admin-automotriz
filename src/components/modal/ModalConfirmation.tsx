import React from 'react'
import Modal from './Modal';
import Button from '../button/Button';
import { Spin } from '@/assets/icons';

interface ModalConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  isDeleting: boolean;
}

const ModalConfirmation: React.FC<ModalConfirmationProps> = ({ isOpen, onClose, onConfirm, message, isDeleting }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className='modalConfirmationContent'>
      <div className="p-4">
        <h2 className="text-lg font-bold uppercase">¡AVISO!</h2>
        <p className='font-semibold'>{message}</p>
        <div className="flex justify-end gap-4 mt-4">
          <Button onClick={onClose} className="bg-ui-gray text-gray-700 px-4 py-2 rounded-md font-bold text-sm">
            CANCELAR
          </Button>
          <button 
            onClick={onConfirm} 
            className={`bg-ui-red text-white px-4 py-2 rounded-md font-bold text-sm ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isDeleting}
          >
            {isDeleting ? (
                <div className='flex items-center justify-center'>
                  <Spin/>
                  ELIMINANDO...
                </div>
              ) : 'ELIMINAR'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirmation;