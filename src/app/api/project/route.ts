import { connectToDB } from '@src/configs/database_config';
import Project from '@src/models/project';
import { CloudinaryImageType } from '@src/types/project_type';
import { uploader } from '@src/utils/cloudinary_utils';
import { fileToBase64Handler } from '@src/utils/file_utils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * ======================================
 *  DONE ADD ONE PROJECT
 * ======================================
 */
export const POST = async (req: NextRequest) => {
  try {
    // Get form data from request
    const data: FormData = await req.formData();

    // Base64 image converter
    const file: string = await fileToBase64Handler(data, 'image');

    // Raw string data that is supposed to be array
    const genre: string = data.get('genre') as string;

    //Arranging data
    const dataUploaded = {
      author: data.get('author') as string,
      title: data.get('title') as string,
      genre: genre.split(',') as string[],
      synopsis: data.get('synopsis') as string,
      image: {} as CloudinaryImageType
    };

    // Cloudinary upload handling
    if (file) {
      const uploadHandler = async (path: any) => await uploader(path, 'book-covers');
      const bookCover = await uploadHandler(file);
      dataUploaded.image = bookCover;
    }

    // Connect to db and save the data
    await connectToDB();
    const newProject = await new Project({
      author: dataUploaded.author,
      title: dataUploaded.title,
      genre: dataUploaded.genre,
      synopsis: dataUploaded.synopsis,
      image: {
        public_id: dataUploaded.image.public_id,
        url: dataUploaded.image.url
      }
    });
    await newProject.save();

    return NextResponse.json({ ...dataUploaded }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
