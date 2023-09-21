// import multer from 'multer';

/**
 * ========================================
 * FOR UPLOADING TO S3's
 * ========================================
 */
export const fileToBase64Handler = async (data: FormData, name?: string): Promise<string> => {
  const file: File = data.get(name ?? 'image') as File;
  const bytes: ArrayBuffer = await file.arrayBuffer();
  const buffer: string = Buffer.from(bytes).toString('base64');
  const b64: string = `data:${file.type};base64,${buffer}`;
  return b64;
};

/**
 * ========================================
 * MULTER HANDLER
 * ========================================
 */

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, 'public/assets/uploads');
//   },
//   filename: (req, file, callback) => {
//     callback(null, new Date().toISOString() + '-file-.' + file.mimetype);
//   }
// });

// const fileFilter = (req: any, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
//     callback(null, true);
//   } else {
//     callback(null, false);
//   }
// };

// export const upload = multer({
//   storage: storage,
//   limits: { fieldSize: 1024 * 1024 },
//   fileFilter: fileFilter
// });
