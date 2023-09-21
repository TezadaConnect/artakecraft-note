'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type ProjectCardPropType = {
  id: string;
  title: string;
  synopsis: string;
  img_url: string;
};

const ProjectCard = ({ id, title, synopsis, img_url }: ProjectCardPropType) => {
  const router = useRouter();
  const url = '/dashboard/editor/' + id;
  return (
    <div
      className="relative group h-64 bg-slate-500 text-white w-full rounded-md overflow-hidden cursor-pointer"
      onDoubleClick={() => router.push(url)}
    >
      <Image src={img_url} alt="recent-work" sizes="max-width: 100%" fill className="object-cover" />

      <div className="h-64 flex flex-col justify-end bg-gradient-to-t from-black/80 to-bg-black transition-all duration-200 translate-y-72 group-hover:translate-y-0">
        <p className="text-lg font-semibold mx-3">{title}</p>
        <p className="text-xs mx-3 truncate">{synopsis}</p>
        <p className="text-sm mx-3 mb-3 font-semibold blue_gradient">Continue Writing</p>
      </div>
    </div>
  );
};

export default ProjectCard;

export const EmptyProjectCard = () => {
  return <div className="relative group h-64 bg-gray-200 text-gray-200 w-full"></div>;
};
