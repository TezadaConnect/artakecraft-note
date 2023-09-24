import { FolderType } from '@src/types/folder_type';
import { NoteType } from '@src/types/note_type';
import { ProjectType } from '@src/types/project_type';

// THIS FUNCTIONS ARE USED IN EDITOR PAGE

export const getNoteDataByProject = (project: ProjectType): string | null => {
  if (project === null) return null;
  let returnValue: string | null = null;
  const folders: FolderType[] = project?.folders as FolderType[];
  folders?.forEach((item) => {
    const notes: NoteType[] = item?.notes as NoteType[];
    notes?.forEach((note) => {
      if (note) return (returnValue = note._id);
    });

    if (returnValue !== null) return returnValue;
    console.log(item);
  });
  return returnValue;
};

export const getNoteDataById = (id: string, project: ProjectType): NoteType | null => {
  if (project === null) return null;
  const folders: FolderType[] = project?.folders as FolderType[];
  let returnValue: NoteType | null = null;
  folders?.forEach((item) => {
    const notes: NoteType[] = item?.notes as NoteType[];
    notes?.forEach((note) => {
      if (note?._id === id) return (returnValue = note);
    });
  });
  return returnValue;
};
