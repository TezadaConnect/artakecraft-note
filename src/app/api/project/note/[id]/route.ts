import { connectToDB } from '@src/configs/database_config';
import Note from '@src/models/note';
import { NoteType } from '@src/types/note_type';
import { NextRequest, NextResponse } from 'next/server';

/**
 * ======================================
 *  READ NOTE
 * ======================================
 */
export const GET = async (req: NextRequest, { params }: any) => {
  try {
    await connectToDB();
    const updateNote: NoteType | null = await Note.findById(params.id);
    return NextResponse.json({
      _id: updateNote?._id,
      text: updateNote?.text,
      title: updateNote?.title
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

/**
 * ======================================
 *  UPDATE NOTE
 * ======================================
 */
export const PATCH = async (req: NextRequest, { params }: any) => {
  const { title, text } = await req.json();
  try {
    await connectToDB();
    const updateNote = await Note.findByIdAndUpdate(params.id);
    updateNote.title = title ?? updateNote.title;
    updateNote.text = text ?? updateNote.text;
    await updateNote.save();
    return NextResponse.json({ status: 'Success' });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

/**
 * ======================================
 *  DELETE NOTE
 * ======================================
 */
export const DELETE = async (req: NextRequest, { params }: any) => {
  try {
    await connectToDB();
    const updateNote = await Note.findByIdAndDelete(params.id);
    await updateNote.save();
    return NextResponse.json({ status: 'Success' });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
