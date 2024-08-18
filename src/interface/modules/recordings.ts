export interface ModalRecordingProps {
  process: 'RECEPCIÓN' | 'MANT. MAYOR' | 'AFIN. ELECTRÓNICO' | 'ENTREGA';
  idmeeting: number;
  plate: string;
  onClose: () => void;
  fetchRecordings: () => Promise<void>;
}
export interface Recording {
  idrecording: number;       
  idmeeting: number;         
  date_recording: string;   
  name: string;              
  process: string;           
  active: 'S' | 'N';         
  url_recording?: string;
}