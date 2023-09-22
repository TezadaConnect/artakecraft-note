import { createSlice } from '@reduxjs/toolkit';
import { ProjectType } from '@src/types/project_type';

export type EditorLeftStateType = {
  projectInfo: ProjectType | null;
};

const initialState: EditorLeftStateType = {
  projectInfo: null
};

export const editorLeftSlice = createSlice({
  name: 'editorLeft',
  initialState,
  reducers: {
    updateProjectInfo: (state, actions) => {
      state.projectInfo = { ...actions.payload };
    }
  }
});

export const { updateProjectInfo } = editorLeftSlice.actions;

export default editorLeftSlice.reducer;
