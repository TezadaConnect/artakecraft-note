'use client';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useUpdateNoteMutation } from '@src/redux/api_features/api_project_slice';
import { NoteType } from '@src/types/note_type';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { memo, useMemo, useRef, useState } from 'react';
import { BsPencilFill } from 'react-icons/bs';
import { IoCloudDoneSharp } from 'react-icons/io5';
import { RiLoader3Line } from 'react-icons/ri';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type WritersNoteComponentProp = {
  note: NoteType;
  setText: (e: NoteType) => void;
};

const WritersNoteComponent = ({ note, setText }: WritersNoteComponentProp) => {
  const [isPending, setIsPending] = useState(false);
  const loadWrite = useMemo(() => isPending, [isPending]);
  const timerRef = useRef<any>(null);
  const [update] = useUpdateNoteMutation();
  const noteId = useSearchParams().get('noteId') as string;

  const handleChange = (val: string) => {
    setIsPending(true);
    clearTimeout(timerRef.current);
    setText({ ...note, text: val });
    timerRef.current = setTimeout(async () => {
      try {
        await update({ id: noteId as string, inputs: { text: val } }).unwrap();
      } catch (error) {
        console.log(error);
      }
      setIsPending(false);
    }, 2000);
  };

  const [animateRef] = useAutoAnimate();

  return (
    <div>
      <div className="flex justify-between items-center py-3  mx-3">
        <div className="flex gap-1 justify-center items-center">
          <h1 className="text-2xl font-semibold">{note?.title}</h1>
          <span className="text-gray-500 hover:text-teal-600 duration-200 hover:-rotate-12 p-2">
            <BsPencilFill size={15} />
          </span>
        </div>

        <div className="flex gap-3 justify-center items-center group  duration-200 text-gray-500">
          {loadWrite ? (
            <span className="animate-spin">
              <RiLoader3Line size={24} />
            </span>
          ) : (
            <span className="text-teal-600">
              <IoCloudDoneSharp size={22} />
            </span>
          )}
        </div>
      </div>
      <div ref={animateRef}>
        <ReactQuill theme="bubble" value={note?.text} onChange={handleChange} className="text-lg" placeholder="Write here..." />
      </div>
      <div className="my-4 text-left text-slate-500 text-xs mx-3">&copy; 2023 Artakecraft Note</div>
    </div>
  );
};

export default memo(WritersNoteComponent);
