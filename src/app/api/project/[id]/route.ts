import { connectToDB } from '@src/configs/database_config';
import Project from '@src/models/project';
import { ProjectType } from '@src/types/project_type';
import { NextRequest, NextResponse } from 'next/server';

/**
 * ======================================
 *  DONE GET ONE PROJECT
 * ======================================
 */
export const GET = async (req: NextRequest, { params }: any) => {
  try {
    await connectToDB();
    const project: ProjectType = (await Project.findById(params.id)) as ProjectType;
    if (!project) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json({
      title: project.title,
      image: project.image,
      synopsis: project.synopsis,
      genre: project.genre
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
};

export const PATCH = async (req: Request, { params }: any) => {
  try {
    return NextResponse.json({
      message: 'Success',
      data: 'hELLO',
      status: 200
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
};

export const DELETE = async (req: Request, { params }: any) => {
  try {
    return NextResponse.json({
      message: 'Success',
      data: 'hELLO',
      status: 200
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
};
