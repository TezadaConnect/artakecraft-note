import { FolderType } from '@src/types/folder_type';
import { NoteType } from '@src/types/note_type';

export const getFirstNoteIdFromFolderArray = (data: FolderType[]): string => {
  const folders = data as FolderType[];
  const notes = folders[0]?.notes as NoteType[];
  return notes[0]?._id ?? '';
};
