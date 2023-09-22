'use client';
import { Fragment, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import FolderNoteModal from '../modals/FolderNoteModal';
import LeftToolBar from './LeftToolBar';
import FolderCard from './FolderCard';
import { useSelector } from 'react-redux';
import { RootState } from '@src/redux/store';
import { useDispatch } from 'react-redux';
import { useParams } from 'next/navigation';
import { ProjectType } from '@src/types/project_type';
import { updateProjectInfo } from '@src/redux/features/editor_left_slice';
import { DragDropContext, Draggable, DraggableProvided, DropResult, DroppableProvided } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from '../common/StricModeDroppable';
import { FolderType } from '@src/types/folder_type';

const LeftSidebarComponent = () => {
  const { projectInfo } = useSelector((state: RootState) => state.editorLeft);
  const isRendered = useRef(true);
  const dispath = useDispatch();
  const { id } = useParams();
  const curruntData = useMemo(() => projectInfo, [projectInfo]);
  const folders = curruntData?.folders as FolderType[];

  const fetchCurrentProject = useCallback(async () => {
    const item_id = id as string;
    const url: string = '/api/project/' + item_id;
    const res: Response = await fetch(url, { method: 'GET' });
    const data: ProjectType = await res.json();
    if (res.ok) {
      dispath(updateProjectInfo({ ...data }));
      return;
    }
    console.log('Error: ' + res.status);
  }, [id, dispath]);

  useEffect(() => {
    if (isRendered.current) {
      isRendered.current = false;
      fetchCurrentProject();
    }
  }, [fetchCurrentProject]);

  const handleDragStart = (result: any) => {};

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const folderHolder: FolderType[] = [...folders];
    const [reordered] = folderHolder.splice(result.source.index, 1);
    folderHolder.splice(result.destination.index, 0, reordered);
    dispath(updateProjectInfo({ ...projectInfo, folders: folderHolder ?? [] }));
  };

  const handleDragUpate = (result: any) => {};

  return (
    <Fragment>
      <FolderNoteModal onCreateCallback={() => fetchCurrentProject()} />
      <div className="hidden col-span-2 border-r-2 md:block overflow-y-auto border-slate-900 h-screen">
        <LeftToolBar />
        <DragDropContext onDragEnd={handleDragEnd} onDragUpdate={handleDragUpate} onDragStart={handleDragStart}>
          <Droppable droppableId="main-droppable">
            {(droppableProvided: DroppableProvided) => (
              <div className="px-3" {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
                {projectInfo?.folders?.map((item: any, index: number) => (
                  <Draggable key={item?._id} draggableId={item?._id.toString()} index={index}>
                    {(draggablebleProvided: DraggableProvided) => (
                      <span {...draggablebleProvided.draggableProps} {...draggablebleProvided.dragHandleProps} ref={draggablebleProvided.innerRef}>
                        <FolderCard item={item} />
                      </span>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </Fragment>
  );
};

export default memo(LeftSidebarComponent);
