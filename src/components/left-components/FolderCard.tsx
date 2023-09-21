'use client';
import { ReactNode, useState } from 'react';
import { AiFillFolder } from 'react-icons/ai';

type FolderCardProp = {
  title: string;
  children: ReactNode;
};

const FolderCard = ({ title = 'Chapters', children }: FolderCardProp) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div onClick={() => setIsOpen(!isOpen)}>
      <div className="w-full p-2 rounded-tl rounded-tr text-sm border-x border-t border-slate-800 flex gap-2 items-center cursor-pointer select-none group hover:bg-slate-900 duration-200 text-slate-300">
        <span className="group-hover:scale-125 group-hover:text-teal-600 duration-200">
          <AiFillFolder size={18} />
        </span>
        <span className="font-bold text-base">{title}</span>
      </div>
      {isOpen && (
        <div className="mb-2 flex flex-col border-t border-slate-900" onClick={(e: any) => e.stopPropagation()}>
          {children}
        </div>
      )}
    </div>
  );
};

export default FolderCard;
