import multer from 'multer';

// Configura multer para almacenar archivos en memoria
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;