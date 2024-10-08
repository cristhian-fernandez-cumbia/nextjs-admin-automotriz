import { CloseIcon } from '@/assets/icons';
import { ModalProps } from '@/interface/components';


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className='', style }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className='modalOverlay' >
      <div className={`${className} modalContent`} style={style}>
        {onClose && (
          <button className='closeButton' onClick={onClose}>
            <CloseIcon />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
