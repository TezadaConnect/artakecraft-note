'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL_CONFIG } from '@src/configs/url_configs';
import { NoteType } from '@src/types/note_type';
import { AllAndRecentProjectsType } from '@src/types/others';
import { ProjectType } from '@src/types/project_type';

export const apiProjectSlice = createApi({
  reducerPath: 'apiProjectSlice',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL_CONFIG }),
  tagTypes: ['project', 'recentAndAll', 'editorNote'],
  endpoints: (builder) => ({
    /**
     * =================================================
     * Project, Folders, and Notes
     * =================================================
     */
    readProjectFoldersNotes: builder.query<ProjectType, string>({
      query: (id) => '/project/' + id,
      providesTags: ['project']
    }),
    createFolder: builder.mutation<void, any>({
      query: (inputs) => ({
        url: 'project/folder',
        method: 'POST',
        body: inputs
      }),
      invalidatesTags: ['project']
    }),
    createNotes: builder.mutation<void, any>({
      query: (inputs) => ({
        url: 'project/note',
        method: 'POST',
        body: inputs
      }),
      invalidatesTags: ['project']
    }),

    /**
     * =================================================
     * Note Text Handler
     * =================================================
     */
    readNote: builder.query<NoteType, string>({
      query: (id) => 'project/note/' + id,
      providesTags: ['editorNote']
    }),
    updateNote: builder.mutation<void, { id: string; inputs: any }>({
      query: (items) => ({
        url: `project/note/${items.id}`,
        method: 'PATCH',
        body: items.inputs
      }),
      invalidatesTags: ['project']
    }),
    /**
     * =================================================
     * Recent and All
     * =================================================
     */
    readAllAndRecent: builder.query<AllAndRecentProjectsType, string>({
      query: (id) => '/project/author/' + id,
      providesTags: ['recentAndAll']
    }),
    createProject: builder.mutation<void, FormData>({
      query: (form) => ({
        url: 'project',
        method: 'POST',
        body: form
      }),
      invalidatesTags: ['recentAndAll']
    })
  })
});

export const {
  useReadProjectFoldersNotesQuery,
  useCreateFolderMutation,
  useReadAllAndRecentQuery,
  useCreateProjectMutation,
  useCreateNotesMutation,
  useUpdateNoteMutation,
  useReadNoteQuery
} = apiProjectSlice;
