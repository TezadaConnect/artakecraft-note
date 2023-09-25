'use client';
import { useMemo, useState } from 'react';
import { AiFillFolder } from 'react-icons/ai';
import NoteCard from './NoteCard';
import { FolderType } from '@src/types/folder_type';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { NoteType } from '@src/types/note_type';

type FolderCardProp = {
  item: FolderType;
};

const FolderCard = ({ item }: FolderCardProp) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const notes: NoteType[] = useMemo(() => item?.notes as NoteType[], [item?.notes]);
  const [animateRef] = useAutoAnimate();
  return (
    <div onClick={() => setIsOpen(!isOpen)} className="bg-slate-950" ref={animateRef}>
      <div className="w-full p-2 rounded-tl rounded-tr text-sm border-x border-t border-slate-800 flex gap-2 items-center cursor-pointer select-none group hover:bg-slate-900 duration-200 text-slate-300 ">
        <span className="group-hover:scale-125 group-hover:text-teal-600 duration-200">
          <AiFillFolder size={18} />
        </span>
        <span className="font-bold text-base truncate">{item?.name}</span>
      </div>
      {isOpen && (
        <div className="mb-2 flex flex-col border-t border-slate-900" onClick={(e) => e.stopPropagation()}>
          {notes?.map((item) => <NoteCard key={item._id} title={item.title} id={item._id} />)}
        </div>
      )}
    </div>
  );
};

export default FolderCard;
