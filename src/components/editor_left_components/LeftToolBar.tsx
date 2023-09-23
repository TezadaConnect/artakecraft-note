import { FaScrewdriverWrench } from 'react-icons/fa6';
import { BiSolidAddToQueue } from 'react-icons/bi';
import { FiMoreHorizontal, FiMoreVertical } from 'react-icons/fi';
import { memo, useMemo, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { RootState } from '@src/redux/store';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const LeftToolBar = () => {
  const { projectInfo } = useSelector((state: RootState) => state.editorLeft);
  const projectDetail = useMemo(
    () => ({
      title: projectInfo?.title,
      genre: projectInfo?.genre,
      synopsis: projectInfo?.synopsis,
      image: projectInfo?.image
    }),
    [projectInfo?.image, projectInfo?.title, projectInfo?.synopsis, projectInfo?.genre]
  );
  const [isShow, setIsShow] = useState<boolean>(false);
  const pathname = usePathname();
  const [animateRef] = useAutoAnimate();

  return (
    <div className="px-3 py-3 sticky top-0 bg-slate-950 z-50">
      <div className="" ref={animateRef}>
        {isShow && (
          <div className="relative w-full flex h-40 mb-2">
            <Image
              src={projectDetail?.image?.url as string}
              width={120}
              height={100}
              alt="book-cover"
              className="object-cover rounded bg-slate-800"
            />
          </div>
        )}
        <h1 className="truncate font-semibold">{projectDetail?.title}</h1>
        <p className="text-[10px] text-slate-400 italic">Genre: {projectDetail?.genre?.join(', ')}</p>
        {isShow && <p className="text-[12px] text-slate-500 italic mt-2">{projectDetail?.synopsis}</p>}
      </div>
      <div className="flex justify-end items-center text-slate-400">
        <div className="flex gap-3 mt-2 items-center">
          <Link className="hover:scale-125 duration-200 hover:text-teal-600" href={pathname + '?addFolderNote=true'}>
            <BiSolidAddToQueue size={25} />
          </Link>
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
