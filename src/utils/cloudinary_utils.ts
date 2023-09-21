import { CloudinaryImageType } from '@src/types/project_type';
import { UploadApiOptions, v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_API_SECRET,
  secure: true
});

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
