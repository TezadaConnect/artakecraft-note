import { ProjectType } from '@src/types/project_type';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<ProjectType>();

const isoConverter = (iso: string): string => {
  const item = new Date(iso);
  return item.toLocaleDateString();
};

export const ALL_PROJECT_COL: any = [
  columnHelper.accessor(
    '_id',
    columnHelper.display({
      header: 'ID'
    })
  ),
  columnHelper.accessor(
    'title',
    columnHelper.display({
      header: 'PROJECT TITLE'
    })
  ),
  columnHelper.accessor(
    'genre',
    columnHelper.display({
      header: 'GENRE'
    })
  ),
  columnHelper.accessor(
    'updatedAt',
    columnHelper.display({
      header: 'LAST UPDATE',
      cell: (info) => isoConverter(info.getValue() as string)
    })
  )
];
