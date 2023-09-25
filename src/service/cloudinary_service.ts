import { setCloudinaryConfig } from '@src/configs/cloudinary_config';
import { CloudinaryImageType } from '@src/types/project_type';
import { UploadApiOptions, v2 as cloudinary } from 'cloudinary';

setCloudinaryConfig();

const uploader = (file: string, folder: string): Promise<CloudinaryImageType> => {
  const option: UploadApiOptions = {
    resource_type: 'auto',
    folder: folder
  };

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, option, (err: any, url: any) => {
      if (err) return reject(err);
      return resolve({ public_id: url?.public_id, url: url?.url });
    });
  });
};

const remover = () => {};

export { uploader, remover, cloudinary };

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
