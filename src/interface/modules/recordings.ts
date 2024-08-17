export interface ModalRecordingProps {
  process: 'RECEPCIÓN' | 'MANT. MAYOR' | 'AFIN. ELECTRÓNICO' | 'ENTREGA';
  idmeeting: number;
  plate: string;
}