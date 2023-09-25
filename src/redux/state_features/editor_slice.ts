import { createSlice } from '@reduxjs/toolkit';
import { FolderType } from '@src/types/folder_type';
import { NoteType } from '@src/types/note_type';
import { ProjectType } from '@src/types/project_type';

export type EditorStateType = {
  projectInfo: ProjectType | null;
  activeNote: NoteType | null;
};

const initialState: EditorStateType = {
  projectInfo: null,
  activeNote: null
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    updateProjectInfo: (state, actions) => {
      state.projectInfo = actions.payload;
    },
    updateActiveNote: (state, actions) => {
      state.activeNote = { ...actions.payload };
    }
  }
});

export const { updateProjectInfo, updateActiveNote } = editorSlice.actions;
