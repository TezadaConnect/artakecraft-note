import { RootState } from '@src/redux/store';
import { ProjectType } from '@src/types/project_type';
import Image from 'next/image';
import { ReactNode } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { IoSettings } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { ArcElement, Chart, Tooltip } from 'chart.js';
import { wordsPerDay } from '@src/service/project_calculator_service';
import { dateHumanReadable } from '@src/service/convert_service';
import { graphCircleData } from '@src/service/chartjs_service';
import StatsCard from '@src/components/cards/StatsCard';

Chart.register(ArcElement, Tooltip);

const ProjectStatusComponent = () => {
  const { projectInfo } = useSelector((state: RootState) => state.editor);
  const readableDate: string = dateHumanReadable(projectInfo?.createdAt as string);

  return (
    <div className="overflow-y-auto flex gap-3 flex-col xl:flex-row m-3">
      <div className="border-b border-slate-800 rounded-b-lg w-full xl:w-1/2">
        <div className="w-full">
          <div className="relative flex mb-2 w-full h-[250px]">
            <Image
              loading="lazy"
              src={projectInfo?.image?.url ?? '/vercel.svg'}
              quality={20}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              alt="book-cover"
              className="object-cover bg-slate-800 h-72 w-72 rounded-t-lg"
            />
            <div className="mx-3 mb-3 flex gap-3 justify-end absolute bottom-0 right-0 z-30">
              <button className="text-slate-200 hover:animate-spin">
                <IoSettings size={30} />
              </button>
            </div>
          </div>

          <div className="m-3 text-4xl font-semibold">
            <div>{projectInfo?.title}</div>
          </div>
          <div className="mt-2 text-slate-400 italic text-xl flex flex-col mx-3">
            <span className="font-bold text-sm text-slate-500">GENRE</span>
            <span>{projectInfo?.genre?.join(', ')}</span>
          </div>
          <div className="m-3">
            <p className="text-slate-500 italic font-bold text-sm">SYNOPSIS</p>
            <p className="text-slate-400 italic text-xl">{projectInfo?.synopsis}</p>
          </div>
        </div>
      </div>

      <div className="w-full xl:w-1/2 px-3 py-2">
        <div className="font-bold text-2xl">PROJECT STATS</div>
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-3 w-full">
            <StatsCard title="WORDS / DAY" stats={wordsPerDay(projectInfo as ProjectType)} detail={`From ${readableDate} as of today`} />
            <StatsCard title="WORK CONTENT %" detail="Words per folder">
              <div className="h-36 flex w-full justify-center">
                <Doughnut data={graphCircleData(projectInfo as ProjectType, 'Word Count')} />
              </div>
            </StatsCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatusComponent;
