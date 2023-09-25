import Image from 'next/image';
import { FaQuestionCircle } from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { MBTI_LIST } from '@src/utils/static_data_utils';

type CharacterCardProps = {
  name: string;
  mbti: number;
  description: string;
  img: string;
};

const CharacterCard = ({ name, mbti, description, img }: CharacterCardProps) => {
  return (
    <div className="border border-gray-900 p-2 rounded cursor-pointer select-none hover:scale-105 duration-200 hover:bg-slate-900">
      <div className="flex flex-row gap-3 items-center">
        <Image
          loading="lazy"
          quality={20}
          className="rounded-full"
          src={img}
          width={50}
          height={50}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt="avatar"
        />
        <div>
          <p className="font-semibold text-gray-4 00">{name}</p>
          <p className="text-slate-500 text-xs flex gap-2">
            <span>Mbti: {MBTI_LIST[mbti]?.type}</span>
            <Tippy content={MBTI_LIST[mbti]?.description}>
              <span>
                <FaQuestionCircle />
              </span>
            </Tippy>
          </p>
        </div>
      </div>
      <div className="mt-2 line-clamp-3 text-slate-600">{description}</div>
      <p className="blue_gradient text-sm">Read More</p>
    </div>
  );
};

export default CharacterCard;
