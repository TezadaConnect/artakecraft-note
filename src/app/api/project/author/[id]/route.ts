import { connectToDB } from '@src/configs/database_config';
import Project from '@src/models/project';
import { NextResponse } from 'next/server';

/**
 * ======================================
 *  DONE GET ONE PROJECT
 * ======================================
 */

export const GET = async (req: Request, { params }: any) => {
  try {
    await connectToDB();
    const projects = await Project.find({ author: params.id });
    const recents = await Project.find({ author: params.id }).sort({ updatedAt: -1 }).limit(4);
    if (!projects || !recents) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json({ all: projects, recent: recents });
  } catch (error) {
    return NextResponse.json({ error });
  }
};
