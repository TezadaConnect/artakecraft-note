'use client';
import { Dispatch, SetStateAction } from 'react';
import { IoPeople } from 'react-icons/io5';
import { PiNoteFill } from 'react-icons/pi';
import { FaRobot } from 'react-icons/fa';
import { FaTape } from 'react-icons/fa6';

type RightToolBarProps = {
  type: number;
  setType: Dispatch<SetStateAction<number>>;
};

const RightToolBar = ({ type, setType }: RightToolBarProps) => {
  const TOOLS = [
    { name: 'Character\nProfiling', icon: <IoPeople size={25} />, type: 1 },
    { name: 'Scene\nNotes', icon: <FaTape size={25} />, type: 2 },
    { name: 'Paraphraser', icon: <PiNoteFill size={25} />, type: 3 },
    { name: 'Ask AI', icon: <FaRobot size={23} />, type: 4 }
  ];

  return (
    <div className="flex w-full px-2 sticky top-0 z-10 bg-slate-950">
      {TOOLS.map((item, key) => (
        <span
          className={`w-full py-4 flex justify-center text-center flex-col items-center cursor-pointer gap-1 group hover:text-teal-500 duration-200 ${
            type === item.type ? 'text-teal-500' : 'text-gray-600'
          }`}
          key={key}
          onClick={() => setType(item.type)}
        >
          <span className="group-hover:animate-bounce">{item.icon}</span>
          <p className="text-[9px]">{item.name}</p>
        </span>
      ))}
    </div>
  );
};

export default RightToolBar;
