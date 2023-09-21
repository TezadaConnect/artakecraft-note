'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { Fragment, ReactNode } from 'react';

type ModalCommonProps = {
  params: string;
  children: ReactNode;
};

const ModalCommon = ({ children, params }: ModalCommonProps) => {
  const isOpen = useSearchParams().get(params);
  const router = useRouter();
  return (
    <Fragment>
      {isOpen && (
        <div className="fixed top-0 left-0 bg-gray-600/60 z-[10000] h-screen w-full flex justify-center items-center" onClick={() => router.back()}>
          <div className="bg-slate-900 py-3 px-3 rounded w-5/6 lg:w-1/3 text-slate-300" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ModalCommon;
