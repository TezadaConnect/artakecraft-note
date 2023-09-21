'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { Fragment, ReactNode } from 'react';

type ModalCommonProps = {
  params: string;
  children: ReactNode;
  isBusy?: boolean;
};

/**
 * ModalCommon COMPONENT
 * @param children USER DEFINE JSX ELEMENTS
 * @param params URL SEARCH PARAMETER THAT RECIEVE SIGNAL TO OPEN/CLOSE MODAL
 * @param isBusy BOOLEAN THAT TURNS OFF ROUTER BACK IN OUTSIDE CLICK WHEN ISBUSY IS TRUE
 * @returns JSX ELEMENTS
 */
const ModalCommon = ({ children, params, isBusy }: ModalCommonProps) => {
  const isOpen = useSearchParams().get(params);
  const router = useRouter();
  return (
    <Fragment>
      {isOpen && (
        <div
          className="fixed top-0 left-0 bg-gray-600/60 z-[10000] h-screen w-full flex justify-center items-center"
          onClick={() => {
            if (typeof isBusy === 'boolean') {
              if (isBusy === true) return;
              router.back();
              return;
            }
            router.back();
          }}
        >
          <div className="bg-slate-900 py-3 px-3 rounded w-5/6 lg:w-1/3 text-slate-300" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ModalCommon;
