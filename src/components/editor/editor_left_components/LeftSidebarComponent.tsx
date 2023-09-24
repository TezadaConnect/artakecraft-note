'use client';
import { Fragment, memo, useEffect, useMemo } from 'react';
import FolderNoteModal from '@src/components/modals/FolderNoteModal';
import LeftToolBar from './LeftToolBar';
import FolderCard from './FolderCard';
import { useSelector } from 'react-redux';
import { RootState } from '@src/redux/store';
import { useDispatch } from 'react-redux';
import { useParams } from 'next/navigation';
import { updateProjectInfo } from '@src/redux/state_features/editor_slice';
import { DragDropContext, Draggable, DraggableProvided, DropResult, DroppableProvided } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from '@src/components/common/StricModeDroppable';
import { FolderType } from '@src/types/folder_type';
import { useReadProjectFoldersNotesQuery } from '@src/redux/api_features/api_project_slice';

/**
 * THIS IS TEMPORARY NULLIFYING OF DEFAULTPROPS ERROR IN REACT-BEAUTIFUL-DND
 */
const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

const LeftSidebarComponent = () => {
  const { id } = useParams();
  const { projectInfo } = useSelector((state: RootState) => state.editor);
  const { data: project } = useReadProjectFoldersNotesQuery(id as string);
  const currentFolder: FolderType[] = useMemo(() => projectInfo?.folders as FolderType[], [projectInfo?.folders]);
  const dispath = useDispatch();

  useEffect(() => {
    dispath(updateProjectInfo({ ...project }));
  }, [dispath, project]);

  const handleDragEnd = (result: DropResult) => {
    // Out of bounce logic
    if (!result.destination) return;
    // Making a new holder for folder array
    const folderHolder: FolderType[] = [...currentFolder];
    // Reordered logic
    const [reordered] = folderHolder.splice(result.source.index, 1);
    folderHolder.splice(result.destination.index, 0, reordered);
    // Updating  the state with the new order
    dispath(updateProjectInfo({ ...projectInfo, folders: folderHolder ?? [] }));
  };

  return (
    <Fragment>
      <FolderNoteModal />
      <div className="hidden col-span-2 border-r-2 md:block overflow-y-auto border-slate-900 h-screen">
        <LeftToolBar />
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="main-droppable">
            {(droppableProvided: DroppableProvided) => (
              <div className="px-3" {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
                {currentFolder?.map((item: any, index: number) => (
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
