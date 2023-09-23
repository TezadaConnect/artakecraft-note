import { createSlice } from '@reduxjs/toolkit';
import { FolderType } from '@src/types/folder_type';
import { ProjectType } from '@src/types/project_type';

export type EditorStateType = {
  projectInfo: ProjectType | null;
};

const initialState: EditorStateType = {
  projectInfo: null
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    updateProjectInfo: (state, actions) => {
      const data = actions.payload as ProjectType;
      state.projectInfo = { ...data };
    }
  }
});

export const { updateProjectInfo } = editorSlice.actions;
