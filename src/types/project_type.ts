import { FolderType } from './folder_type';

export type ProjectType = {
  _id: string;
  author?: UserType | string;
  title: string;
  genre: string[];
  synopsis: string;
  image: CloudinaryImageType;
  folders?: FolderType[] | string[];
  updatedAt: Date;
};

export type CloudinaryImageType = {
  public_id: string;
  url: string;
};
