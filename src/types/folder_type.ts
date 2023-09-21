import { NoteType } from './note_type';

export type FolderType = {
  _id: string;
  name: string;
  slot: number;
  notes?: NoteType[] | string[];
};
