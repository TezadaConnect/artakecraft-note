import { FaScrewdriverWrench } from 'react-icons/fa6';
import { BiSolidAddToQueue } from 'react-icons/bi';
import { FiMoreHorizontal, FiMoreVertical } from 'react-icons/fi';
import { memo, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ProjectType } from '@src/types/project_type';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

type LeftToolBarProp = {
  currentProj: ProjectType;
};

const LeftToolBar = ({ currentProj }: LeftToolBarProp) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const router: AppRouterInstance = useRouter();
  const pathname = usePathname();
  const openAddNewFolderNote = () => router.push(pathname + '?addFolderNote=true');

  return (
    <div className="px-3 py-3 sticky top-0 bg-slate-950 z-50">
      <div className="">
        {isShow && (
          <div className="relative w-full flex h-40 mb-2">
            <Image src={currentProj?.image?.url as string} width={120} height={100} alt="book-cover" className="object-cover rounded bg-slate-800" />
          </div>
        )}
        <h1 className="truncate font-semibold">{currentProj?.title}</h1>
        <p className="text-[10px] text-slate-400 italic">Genre: {currentProj?.genre?.join(', ')}</p>
        {isShow && <p className="text-[12px] text-slate-500 italic mt-2">{currentProj?.synopsis}</p>}
      </div>
      <div className="flex justify-end items-center text-slate-400">
        <div className="flex gap-3 mt-2 items-center">
          <span className="hover:scale-125 duration-200 hover:text-teal-600" onClick={openAddNewFolderNote}>
            <BiSolidAddToQueue size={25} />
          </span>
          <span className="hover:scale-125 duration-200 hover:text-teal-600">
            <FaScrewdriverWrench size={20} />
          </span>
          <span className="hover:scale-125 duration-200 hover:text-teal-600" onClick={() => setIsShow(!isShow)}>
            {isShow ? <FiMoreVertical size={25} /> : <FiMoreHorizontal size={25} />}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(LeftToolBar);
