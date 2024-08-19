type ProcessType = 'RECEPCIÓN' | 'MANT. MAYOR' | 'AFIN. ELECTRÓNICO' | 'ENTREGA';
import { format } from 'date-fns';

export const generateFileName = (process: ProcessType) => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = String(now.getFullYear()).slice(-2);
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const processCleaned = removeAccents(process.toLowerCase()).replace(/\s+/g, '');
  return `video_${processCleaned}_${year}-${month}-${day}_${hours}-${minutes}-${seconds}.mp4`;
};

const removeAccents = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const formatDate = (date: Date | null) => date ? format(date, 'dd/MM/yyyy') : '';
export const formatDateTime = (date: Date | null) => date ? format(date, 'yyyy-MM-dd HH:mm:ss') : '';