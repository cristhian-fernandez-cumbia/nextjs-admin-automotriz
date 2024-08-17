import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { Camera, Cinema, Play, Trash } from '@/assets/icons';
import { Meeting } from '@/interface/modules/meetings';
import Modal from '@/components/modal/Modal';
import ModalRecording from './modal/ModalRecording';

interface RecordingMeetingProps {
  meeting: Meeting;
}

const RecordingMeeting: React.FC<RecordingMeetingProps> = ({ meeting }) => {
  const router = useRouter(); 
  const processes = ['RECEPCIÓN', 'MANT. MAYOR', 'AFIN. ELECTRÓNICO', 'ENTREGA'] as const;
  const [selectedProcess, setSelectedProcess] = useState<(typeof processes)[number] | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = (process: (typeof processes)[number]) => {
    setSelectedProcess(process);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProcess(null);
  };

  return (
    <>
      <div className='text-black'>
        <h1 className='text-black font-extrabold text-ui-panel-title dark:text-white mb-4'>CITA #{meeting.idmeeting}</h1>
        <div className='mb-6'>
          <h1 className='font-bold mb-4 dark:text-white'>Detalles de la Reunión | {meeting.date_meeting}</h1>
          <div className='flex gap-4 flex-wrap justify-between'>
            <p className='border-2 w-[48%] md:w-[30%] p-2 bg-slate-200'><strong>Marca:</strong> {meeting.brand}</p>
            <p className='border-2 w-[48%] md:w-[30%] p-2 bg-slate-200'><strong>Modelo:</strong> {meeting.model}</p>
            <p className='border-2 w-[48%] md:w-[30%] p-2 bg-slate-200'><strong>Placa:</strong> {meeting.plate}</p>
          </div>
        </div>
        <div>
        {
          processes.map((process, index) =>{
            return (
              <div key={`item-${process}`}>
                <div className='bg-ui-yellow-light flex flex-row justify-between mb-1 px-8 py-3 items-center font-extrabold'>
                  <h2>{`${index +1}. ${process}`}</h2>
                  <button className='py-1 bg-ui-red-button rounded-md text-white flex flex-row items-center gap-2 text-[12px] w-28 justify-center' onClick={() => openModal(process)}>
                    GRABAR
                    <Camera className='scale-125'/>
                  </button>
                </div>
                <div className='bg-ui-gray-light flex flex-row justify-between mb-1 px-8 py-3 font-bold items-center'>
                  <div className='flex flex-row items-center gap-2'>
                    <Cinema className='scale-125'/>
                    <p>video 20_06_24_8:30</p>
                  </div>
                  <div className='flex flex-row w-[108px] justify-between'>
                    <div className='border-2 border-ui-red w-[44px] rounded-sm flex justify-center items-center scale-125'><Trash /></div>
                    <div className='border-2 border-black w-[44px] rounded-sm flex justify-center items-center scale-125'><Play /></div>
                  </div>
                </div>
              </div>
            )
          })
        }
        </div>
        <button
          onClick={() => router.back()}
          className="mt-4 bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600"
        >
          Regresar
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedProcess && (
          <ModalRecording 
            process={selectedProcess}
            idmeeting={meeting.idmeeting} 
            plate={meeting.plate} 
          />
        )}
      </Modal>
    </>
  )
}

export default RecordingMeeting