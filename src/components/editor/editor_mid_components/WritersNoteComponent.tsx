'use client';
import { useUpdateNoteMutation } from '@src/redux/api_features/api_project_slice';
import { NoteType } from '@src/types/note_type';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { ChangeEvent, memo, useMemo, useRef, useState, useTransition } from 'react';
import { BsPencilFill } from 'react-icons/bs';
import { IoClose, IoCloudDoneSharp } from 'react-icons/io5';
import { RiLoader3Line } from 'react-icons/ri';
import { UnprivilegedEditor } from 'react-quill';
import { DeltaStatic, Sources } from 'quill';
import wordsCount from 'words-count';
import { IoIosSave } from 'react-icons/io';
import { htmlStingToStr } from '@src/service/convert_service';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type WritersNoteComponentProp = {
  note: NoteType;
  setText: (e: NoteType) => void;
};

const WritersNoteComponent = ({ note, setText }: WritersNoteComponentProp) => {
  const [isPending, setIsPending] = useState({
    title: false,
    text: false
  });
  const loadWrite = useMemo(() => isPending, [isPending]);
  const timerRef = useRef<any>(null);
  const [update] = useUpdateNoteMutation();
  const noteId = useSearchParams().get('noteId') as string;
  const initCount = wordsCount(htmlStingToStr(note?.text as string));
  const [counter, setCounter] = useState(initCount ?? 0);
  const [pending, setTransitions] = useTransition();

  /**
   * =============================================
   * FOR HANDLING TEXT
   * =============================================
   */
  const handleEditorChange = (val: string, _: DeltaStatic, __: Sources, editor: UnprivilegedEditor) => {
    setIsPending({ ...isPending, text: true });
    clearTimeout(timerRef.current);
    setText({ ...note, text: val });
    setTransitions(() => {
      setCounter(wordsCount(editor.getText()));
    });
    timerRef.current = setTimeout(async () => {
      try {
        await update({ id: noteId as string, inputs: { text: val } }).unwrap();
      } catch (error) {
        console.log(error);
      }
      setIsPending({ ...isPending, text: false });
    }, 2000);
  };

  /**
   * =============================================
   * FOR HANDLING TITLE
   * =============================================
   */
  const [isEdit, setIsEdit] = useState(false);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText({ ...note, title: event.target.value });
  };

  const handTitleSubmit = async () => {
    setIsPending({ ...isPending, title: true });
    try {
      await update({ id: noteId as string, inputs: { title: note?.title } }).unwrap();
    } catch (error) {
      console.log('Error title submit');
    }
    setIsEdit(false);
    setIsPending({ ...isPending, title: false });
  };

  return (
    <div>
      <div className="flex justify-between items-center py-3  px-6 sticky top-0 bg-slate-950/90 z-10">
        {isEdit ? (
          <div className="flex gap-3 justify-center items-center">
            <input
              className="w-full py-2 px-2 text-slate-300 border border-slate-800 rounded-lg bg-slate-900 focus:ring-slate-600 focus:border-slate-600"
              value={note?.title}
              disabled={loadWrite.title}
              onChange={handleTitleChange}
            />

            <span className="text-gray-500 duration-200 group">
              {loadWrite.title ? (
                <span className="text-sm">Saving...</span>
              ) : (
                <span
                  className="text-white group-active:scale-95 flex gap-1 items-center cursor-pointer py-2 px-4 bg-teal-600 rounded-full group-hover:bg-teal-700"
                  onClick={() => handTitleSubmit()}
                >
                  <IoIosSave size={20} /> <span>Save</span>
                </span>
              )}
            </span>
          </div>
        ) : (
          <div className="flex gap-1 justify-center items-center" onClick={() => setIsEdit(true)}>
            <h1 className="text-3xl font-semibold">{note?.title}</h1>
            <span className="text-gray-500 hover:text-teal-600 duration-200 hover:-rotate-12 p-2">
              <BsPencilFill size={15} />
            </span>
          </div>
        )}

        <div className="flex gap-3 justify-center items-center group  duration-200 text-gray-500">
          {loadWrite.text ? (
            <span className="animate-spin">
              <RiLoader3Line size={24} />
            </span>
          ) : isEdit ? (
            <span className="text-red-800 hover:scale-125 duration-200" onClick={() => setIsEdit(false)}>
              <IoClose size={25} />
            </span>
          ) : (
            <span className="text-teal-600">
              <IoCloudDoneSharp size={22} />
            </span>
          )}
        </div>
      </div>
      <div className="mx-3">
        <ReactQuill theme="bubble" value={note?.text} onChange={handleEditorChange} className="text-lg" placeholder="Write here..." />
      </div>
      <div className="my-4 text-left text-slate-500 text-xs mx-6 flex justify-between">
        <div>&copy; 2023 Artakecraft Note</div>
        <div>{pending ? <span>counting...</span> : <span>Word count: {counter}</span>}</div>
      </div>
    </div>
  );
};

export default memo(WritersNoteComponent);
