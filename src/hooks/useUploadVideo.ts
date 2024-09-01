import { useCallback, useState } from 'react';
import { formatDateTime, generateFileName, ProcessType } from '@/utils/functions';
import { useToast } from "@/components/ui/use-toast"; 

export const useUploadVideo = (process: ProcessType, idmeeting: number, plate: string, onClose: () => void, fetchRecordings: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const uploadVideo = useCallback(async (videoBlob: Blob | null) => {
    if (!videoBlob) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      const fileName = generateFileName(process);
      formData.append('video', videoBlob, fileName);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Error al subir el video a S3');
      }

      const { fileUrl } = await uploadResponse.json();

      const data = {
        idmeeting,
        dateRecording: formatDateTime(new Date()),
        nameRecording: fileName,
        process,
        plate,
        urlRecording: fileUrl,
      };

      const saveResponse = await fetch('/api/recordings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (saveResponse.ok) {
        toast({
          title: "Éxito!",
          description: "Video cargado correctamente",
        });
        onClose();
        fetchRecordings();
      } else {
        throw new Error('Error al guardar la información del video');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Ocurrió un error al guardar la información del video",
      });
    } finally {
      setIsLoading(false);
    }
  }, [process, idmeeting, plate, onClose, fetchRecordings, toast]);

  return { uploadVideo, isLoading };
};