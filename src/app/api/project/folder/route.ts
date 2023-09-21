import { connectToDB } from '@src/configs/database_config';
import Folder from '@src/models/folder';
import Project from '@src/models/project';
import { NextRequest, NextResponse } from 'next/server';

/**
 * ======================================
 *  CREATE FOLDER AND SAVE ID TO PROJECT
 * ======================================
 */
export const POST = async (req: NextRequest) => {
  const { name, projectId } = await req.json();

  try {
    await connectToDB();
    const project = await Project.findByIdAndUpdate({ _id: projectId });
    const newFolder = await new Folder({
      name: name,
      notes: [],
      slot: parseInt(project.folders.length) + 1
    });
    await newFolder.save();
    await project.folders.push(newFolder._id);
    await project.save();
    return NextResponse.json({ status: 'Success' });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
