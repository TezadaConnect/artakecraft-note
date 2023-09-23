import { createSlice } from '@reduxjs/toolkit';
import { AllAndRecentProjectsType } from '@src/types/others';
import { ProjectType } from '@src/types/project_type';

export type DashboardStateType = {
  allRecent: AllAndRecentProjectsType | null;
};

const initialState: DashboardStateType = {
  allRecent: null
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    updateAllAndRecent: (state, actions) => {
      state.allRecent = { ...actions.payload };
    }
  }
});

export const { updateAllAndRecent } = dashboardSlice.actions;
