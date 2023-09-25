import { ReactNode } from 'react';

type StatsCardProps = {
  children?: ReactNode;
  title: string;
  stats?: string | number;
  detail?: string;
};

const StatsCard = ({ children, title, stats, detail }: StatsCardProps) => {
  return (
    <div className="bg-slate-900 rounded p-3 flex flex-col justify-between">
      <div className="text-slate-500 font-semibold">{title}</div>
      {children ? <div className="my-2">{children}</div> : <div className="font-bold text-7xl">{stats}</div>}
      <div className="text-sm text-slate-700 italic">{detail}</div>
    </div>
  );
};

export default StatsCard;
