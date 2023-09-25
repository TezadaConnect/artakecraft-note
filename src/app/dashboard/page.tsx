'use client';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { ProjectType } from '@src/types/project_type';
import { useSession } from 'next-auth/react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel, VisibilityState } from '@tanstack/react-table';
import { ALL_PROJECT_COL } from '@src/utils/data_table_column_definitions_utils';
import { useRouter } from 'next/navigation';
import ProjectModal from '@src/components/modals/ProjectModal';
import Navbar from '@src/components/common/Navbar';
import { useReadAllAndRecentQuery } from '@src/redux/api_features/api_project_slice';
import { useDispatch } from 'react-redux';
import { updateAllAndRecent } from '@src/redux/state_features/dashboard_slice';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import ProjectCard from '@src/components/cards/ProjectCard';

const DashboardPage = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const { data: allRecent } = useReadAllAndRecentQuery(session?.user?.id as string);
  const dataRecent: ProjectType[] | undefined = useMemo(() => allRecent?.recent, [allRecent?.recent]);
  const [autoAnimate] = useAutoAnimate();

  useEffect(() => {
    dispatch(updateAllAndRecent({ ...allRecent }));
  }, [dispatch, allRecent]);

  return (
    <Fragment>
      <div>
        <ProjectModal />
        <Navbar />
        <section className="relative flex flex-col items-center z-0 h-full">
          <div className="relative w-10/12 mt-10 mb-5">
            <h1 className="text-2xl font-semibold text-slate-300">Recents</h1>
            <div className="relative w-full rounded-md px-3 py-2">
              <div
                className="relative grid grid-cols-1 gap-3 lg:grid-cols-4 md:grid-cols-2 grid-rows-4 lg:grid-rows-1 md:grid-rows-2 grid-flow-row"
                ref={autoAnimate}
              >
                {dataRecent?.map((item, key) => (
                  <ProjectCard id={item._id} title={item.title} img_url={item.image.url} synopsis={item.synopsis} key={key} />
                ))}
              </div>
            </div>
          </div>
          {/* ----TABLE SECTION---- */}
          <div className="relative text-left w-10/12 text-slate-300">
            <TableComponentSection project={allRecent?.all as ProjectType[]} />
            <div className="my-4 text-left text-slate-500 text-xs">&copy; 2023 Artakecraft Note</div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default DashboardPage;

type TableComponentSectionProps = {
  project: ProjectType[];
};

const TableComponentSection = ({ project = [] }: TableComponentSectionProps) => {
  const router = useRouter();
  const data: any = useMemo(() => {
    const arrHolder: any = [];
    project.forEach((item) => {
      arrHolder.push({
        ...item,
        genre: item.genre.join(', ')
      });
    });
    return arrHolder;
  }, [project]);

  const [filter, setFilter] = useState('');

  const table = useReactTable({
    data: data,
    columns: ALL_PROJECT_COL,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setFilter,
    state: {
      globalFilter: filter,
      columnVisibility: { _id: false } as VisibilityState
    }
  });

  const url = '/dashboard/editor/';
  return (
    <div className="relative shadow-md sm:rounded-lg py-4">
      {/* Table Section Header */}
      <div className="sticky top-12">
        <div className="flex justify-between items-center mb-4 pt-3 flex-col md:flex-row ">
          <h1 className="text-2xl font-semibold text-left w-full">Works</h1>

          <div className="pb-4 w-full flex flex-row justify-start md:justify-end">
            <div className="relative mt-3 lg:mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="w-80 block p-2 pl-10 text-sm text-slate-300 border border-slate-800 rounded-lg bg-slate-900 focus:ring-slate-600 focus:border-slate-600"
                placeholder="Search for projects"
                value={filter}
                onChange={(e: any) => setFilter(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Table */}
      <table className="w-full text-sm text-left text-gray-500 0">
        <thead className="text-xs text-gray-700 uppercase sticky top-28">
          {table.getHeaderGroups().map((head) => (
            <tr key={head.id}>
              {head.headers.map((header) => (
                <th scope="col" className="px-6 py-3" key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row: any) => (
            <tr
              className="border-b border-slate-700 hover:bg-slate-900 duration-150 cursor-pointer"
              key={row.id}
              onDoubleClick={() => router.push(url + row.original._id)}
            >
              {row.getVisibleCells().map((cell: any) => (
                <td className="px-6 py-4" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {table.getPageCount() > 10 && (
        <div className="flex mt-4 gap-3 w-full justify-end">
          <button className="btn-dark px-4 py-2" onClick={() => table.setPageIndex(0)}>
            First Page
          </button>
          <button disabled={!table.getCanPreviousPage()} className="btn-dark px-4 py-2" onClick={() => table.previousPage()}>
            Previous Page
          </button>
          <button disabled={!table.getCanNextPage()} className="btn-dark px-4 py-2" onClick={() => table.nextPage()}>
            Next Page
          </button>
          <button className="btn-dark px-4 py-2" onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
            Last Page
          </button>
        </div>
      )}
    </div>
  );
};
