'use client';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import 'react-quill/dist/quill.bubble.css';
import RightToolBar from '@src/components/editor/editor_right_components/RightToolBar';
import CharacterCard from '@src/components/editor/editor_right_components/CharacterCard';
import { CARD_LIST, GENERATE_IMAGE } from '@src/utils/static_data_utils';
import LeftSidebarComponent from '@src/components/editor/editor_left_components/LeftSidebarComponent';
import { useSearchParams } from 'next/navigation';
import { useReadNoteQuery } from '@src/redux/api_features/api_project_slice';
import { NoteType } from '@src/types/note_type';
import WritersNoteComponent from '@src/components/editor/editor_mid_components/WritersNoteComponent';
import LoaderComponent from '@src/components/common/LoaderComponent';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const Editor = () => {
  const noteId = useSearchParams().get('noteId');
  const [note, setNote] = useState<NoteType>();
  const [busy, setBusy] = useState<boolean>(false);
  const { data, isLoading, refetch } = useReadNoteQuery(noteId as string);

  const setterHandlerCallback = useCallback((val: NoteType) => setNote({ ...val }), []);

  const [animateRef] = useAutoAnimate();

  const loader: boolean = useMemo(() => {
    const item: boolean = isLoading || busy;
    return item;
  }, [isLoading, busy]);

  const fetchData = useCallback(async () => {
    setBusy(true);
    if (noteId !== null && data) {
      try {
        await refetch().unwrap();
        const itemHolder = data as NoteType;
        setNote({ ...itemHolder });
      } catch (error) {
        console.log(error);
      }
    }
  }, [noteId, data, refetch]);

  useEffect(() => {
    fetchData();
    const timeoutModule = setTimeout(() => {
      setBusy(false);
    }, 1000);
    return () => {
      clearTimeout(timeoutModule);
    };
  }, [fetchData]);

  return (
    <Fragment>
      <section className="h-screen bg-slate-950 overflow-hidden text-gray-300 top-0">
        <div className="grid grid-cols-12 grid-rows-1">
          <LeftSidebarComponent />
          <div className="col-span-12 md:col-span-7 px-3 py-2 border-r-2 border-slate-900" ref={animateRef}>
            {noteId ? (
              loader ? (
                <LoaderComponent />
              ) : (
                <WritersNoteComponent note={note as NoteType} setText={setterHandlerCallback} />
              )
            ) : (
              <div>Hello World</div>
            )}
          </div>
          <RightPageComponent />
        </div>
      </section>
    </Fragment>
  );
};

export default Editor;

const RightPageComponent = () => {
  const [type, setType] = useState<number>(1);

  return (
    <div className="hidden col-span-3 md:block overflow-auto h-screen">
      <RightToolBar setType={setType} type={type} />
      <div>
        {type == 1 && (
          <div className="px-3 py-2 flex flex-col gap-1 overflow-y-auto h-full">
            {CARD_LIST.map((char, index) => (
              <CharacterCard key={index} name={char.name} mbti={char.mbti} description={char.desc} img={GENERATE_IMAGE} />
            ))}
          </div>
        )}
        {type == 2 && (
          <div className="px-3 py-2 flex flex-col gap-1 overflow-y-auto max-h-[575px]">
            <h1 className="italic text-slate-500">Scene Notes Comming Soon!</h1>
          </div>
        )}
        {type == 3 && (
          <div className="px-3 py-2 flex flex-col gap-1 overflow-y-auto max-h-[575px]">
            <h1 className="italic text-slate-500">Paraphraser Comming Soon!</h1>
          </div>
        )}
        {type == 4 && (
          <div className="px-3 py-2 flex flex-col gap-1 overflow-y-auto max-h-[575px]">
            <h1 className="italic text-slate-500">AI Chat-GPT Comming Soon!</h1>
          </div>
        )}
      </div>
    </div>
  );
};
