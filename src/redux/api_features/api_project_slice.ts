'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL_CONFIG } from '@src/configs/url_configs';
import { ProjectType } from '@src/types/project_type';

export const apiProjectSlice = createApi({
  reducerPath: 'apiProjectSlice',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL_CONFIG }),
  tagTypes: ['project'],
  endpoints: (builder) => ({
    fetchProjectFoldersNotes: builder.query<ProjectType, string>({
      query: (id) => '/project/' + id,
      providesTags: ['project']
    }),
    createFolder: builder.mutation({
      query: (inputs) => ({
        url: 'project/folder',
        method: 'POST',
        body: inputs
      }),
      invalidatesTags: ['project']
    })
  })
});

export const { useFetchProjectFoldersNotesQuery, useCreateFolderMutation } = apiProjectSlice;
