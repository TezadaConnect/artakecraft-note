import { FolderType } from '@src/types/folder_type';
import { NoteType } from '@src/types/note_type';
import { ProjectType } from '@src/types/project_type';
import wordsCount from 'words-count';
import { htmlStingToStr } from './convert_service';

export const wordsPerDay = (project: ProjectType): number => {
  if (!project) return 0;
  const count: number = projectTotalWords(project) ?? 0;
  const dateCreated: Date = new Date(project.createdAt);
  const dateNow: Date = new Date(Date.now());
  const timeDif: number = dateNow.getTime() - dateCreated.getTime();
  const dayDif: number = timeDif / (1000 * 3600 * 24);
  if (!dayDif) return 0;
  return Math.floor(count / Math.ceil(dayDif));
};

export const projectTotalWords = (project: ProjectType): number => {
  if (!project) return 0;
  const foldersArray: FolderType[] = (project.folders as FolderType[]) ?? [];
  let totalCount: number = 0;
  foldersArray?.forEach((folder) => {
    const notesArray: NoteType[] = (folder.notes as NoteType[]) ?? [];
    notesArray?.forEach((note) => {
      totalCount += wordsCount(htmlStingToStr((note.text as string) ?? ''));
    });
  });
  return totalCount;
};

export type ArrayLabelValue = {
  label: string[];
  value: number[];
};

export const wordsCountPerFolder = (project: ProjectType): ArrayLabelValue => {
  if (!project) return { label: [], value: [] };
  const foldersArray: FolderType[] = (project.folders as FolderType[]) ?? [];
  const returnValue: ArrayLabelValue = { label: [], value: [] };
  foldersArray?.forEach((folder) => {
    const notesArray: NoteType[] = (folder.notes as NoteType[]) ?? [];
    let folderTextCount: number = 0;
    notesArray?.forEach((note) => {
      folderTextCount += wordsCount(htmlStingToStr(note.text ?? ''));
    });
    returnValue.label.push(folder.name);
    returnValue.value.push(folderTextCount);
  });
  return returnValue;
};
