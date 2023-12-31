import { cloudinary } from '@src/service/cloudinary_service';

export const setCloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_API_SECRET,
    secure: true
  });
};
