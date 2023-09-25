import Link from 'next/link';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { MdNote } from 'react-icons/md';

type NoteCardProps = {
  title: string;
  id?: string;
};

const NoteCard = ({ title = 'Towns of Beginnings', id }: NoteCardProps) => {
  const noteId = useSearchParams().get('noteId');
  const stateSelection: boolean = id === noteId ? true : false;
  const pathname = usePathname();
  return (
    <Link
      href={pathname + '?noteId=' + id}
      className={`w-full p-2 border-b border-slate-900 rounded-b cursor-pointer select-none group ${
        stateSelection ? 'bg-slate-900' : 'hover:bg-slate-900'
      }`}
    >
      <div className="flex items-center gap-2 ml-5">
        <span className={`text-slate-600  ${stateSelection ? 'text-teal-600 scale-125' : 'group-hover:text-teal-600 group-hover:scale-125'}`}>
          <MdNote size={15} />
        </span>
        <span className="text-slate-600 text-sm truncate">{title}</span>
      </div>
    </Link>
  );
};

export default NoteCard;
