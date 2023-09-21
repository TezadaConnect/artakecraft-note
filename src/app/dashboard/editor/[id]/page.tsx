'use client';
import { BsPencilFill } from 'react-icons/bs';
import { AiFillSetting } from 'react-icons/ai';
import { Fragment, memo, useEffect, useState } from 'react';
import 'react-quill/dist/quill.bubble.css';
import RightToolBar from '@src/components/right-components/RightToolBar';
import dynamic from 'next/dynamic';
import CharacterCard from '@src/components/right-components/CharacterCard';
import { CARD_LIST, GENERATE_IMAGE } from '@src/utils/static_data_utils';
import LeftToolBar from '@src/components/left-components/LeftToolBar';
import FolderCard from '@src/components/left-components/FolderCard';
import NoteCard from '@src/components/left-components/NoteCard';
import FolderNoteModal from '@src/components/modals/FolderNoteModal';
import { ProjectType } from '@src/types/project_type';
import { useParams } from 'next/navigation';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Editor = () => {
  const [text, setText] = useState<string>();

  return (
    <Fragment>
      <section className="h-screen bg-slate-950 overflow-hidden text-gray-300 top-0">
        <div className="grid grid-cols-12 grid-rows-1">
          <LeftPageComponent />
          {/* HEADER SECTION */}
          <div className="col-span-12 md:col-span-7 px-3 py-2 border-r-2 border-slate-900">
            <div className="flex justify-between items-center py-3  mx-3">
              <div className="flex gap-1 justify-center items-center">
                <h1 className="text-2xl font-semibold">Chapter 1</h1>
                <span className="text-gray-500 hover:text-teal-600 duration-200 hover:-rotate-12 p-2">
                  <BsPencilFill size={15} />
                </span>
              </div>

              <div className="flex gap-3 justify-center items-center group hover:text-teal-600 duration-200 text-gray-500">
                <span className="hover:animate-spin">
                  <AiFillSetting size={22} />
                </span>
              </div>
            </div>
            <div>
              <ReactQuill
                theme="bubble"
                value={text}
                onChange={(value: any) => {
                  setText(value);
                }}
                className="text-lg"
                placeholder="Write here..."
              />
            </div>

            <div className="my-4 text-left text-slate-500 text-xs mx-3">&copy; 2023 Artakecraft Note</div>
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

const LeftPageComponent = () => {
  const [currentProj, setCurrentProj] = useState<ProjectType>();
  const { id } = useParams();
  useEffect(() => {
    const fetchCurrentProject = async (item_id: string) => {
      const url: string = '/api/project/' + item_id;
      const res: Response = await fetch(url, { method: 'GET' });
      const data: ProjectType = await res.json();
      if (res.ok) {
        setCurrentProj({ ...data });
        return;
      }
      console.log('Error: ' + res.status);
    };
    fetchCurrentProject(id as string);
  }, [id]);

  return (
    <Fragment>
      <FolderNoteModal />
      <div className="hidden col-span-2 border-r-2 md:block overflow-y-auto border-slate-900">
        <LeftToolBar currentProj={currentProj as ProjectType} />
        <div className="px-3">
          <FolderCard title="Chapters">
            <NoteCard title="Chapter 1" id="1" />
            <NoteCard title="Chapter 2" />
            <NoteCard title="Chapter 3" />
          </FolderCard>
          <FolderCard title="Research">
            <NoteCard title="Tikbalang 1" />
            <NoteCard title="Sarangay" />
          </FolderCard>
          <FolderCard title="Brain Vomit">
            <NoteCard title="Geo Locations" />
            <NoteCard title="Qoutes" />
            <NoteCard title="hilarious Joke" />
          </FolderCard>
        </div>
      </div>
    </Fragment>
  );
};
