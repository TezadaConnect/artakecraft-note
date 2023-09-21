import { connectToDB } from '@src/configs/database_config';
import Folder from '@src/models/folder';
import Note from '@src/models/note';
import { NextRequest, NextResponse } from 'next/server';

/**
 * ======================================
 *  CREATE NOTE AND SAVE ID TO FOLDER
 * ======================================
 */
export const POST = async (req: NextRequest) => {
  const { title, folderId } = await req.json();
  try {
    await connectToDB();
    const folder = await Folder.findById(folderId);
    const newNote = await new Note({
      title: title,
      text: ''
    });
    await newNote.save();
    await folder.notes.push(newNote._id);
    await folder.save();
    return NextResponse.json({ ...newNote });
  } catch (error) {
    return NextResponse.json({ error });
  }
};
