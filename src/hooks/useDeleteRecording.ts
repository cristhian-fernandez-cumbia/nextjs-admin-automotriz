import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast"; 

const useDeleteRecording = (fetchRecordings: () => void) => {
  const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [recordingToDelete, setRecordingToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false); // Nuevo estado para controlar la carga
  const { toast } = useToast();

  const openDeleteModal = (idrecording: number) => {
    setRecordingToDelete(idrecording);
    setModalDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setModalDeleteOpen(false);
    setRecordingToDelete(null);
  };

  const deleteRecording = async () => {
    if (recordingToDelete === null) return;

    setIsDeleting(true); // Cambia el estado a cargando

    try {
      const response = await fetch(`/api/recordings`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idrecording: recordingToDelete })
      });

      if (!response.ok) {
        toast({
          title: "Error al eliminar la grabación",
          description: "No se pudo eliminar la grabación.",
          variant: "destructive",
        });
        throw new Error('No se pudo eliminar la grabación.');
      }

      fetchRecordings();
      closeDeleteModal(); 
    } catch (error) {
      toast({
        title: "Error al eliminar la grabación",
        description: "No se pudo eliminar la grabación.",
        variant: "destructive",
      });
      console.error('Error al eliminar la grabación:', error);
    } finally {
      setIsDeleting(false); // Restaura el estado
    }
  };

  return {
    isModalDeleteOpen,
    openDeleteModal,
    closeDeleteModal,
    deleteRecording,
    isDeleting
  };
};

export default useDeleteRecording;