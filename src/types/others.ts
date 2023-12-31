import { ProjectType } from './project_type';

// USED IN DASHBOARD AND API PROJECT SLICE
export type AllAndRecentProjectsType = {
  all: ProjectType[];
  recent: ProjectType[];
};

export type OptionSelect = {
  label: string;
  value: string;
};
