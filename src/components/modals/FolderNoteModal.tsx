import React, { memo, useCallback, useState } from 'react';
import ModalCommon from '../common/ModalCommon';
import { useSearchParams, useRouter } from 'next/navigation';
import { IoClose } from 'react-icons/io5';
import { AiFillFileAdd, AiFillFolderAdd } from 'react-icons/ai';
import { DisplayDirNoteEnum } from '@src/utils/enums_utils';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const FolderNoteModal = ({}) => {
  const [display, setDisplay] = useState<DisplayDirNoteEnum>(DisplayDirNoteEnum.main);
  const label = useSearchParams().get('label');
  const router: AppRouterInstance = useRouter();

  const displaySetterMethod = useCallback((val: DisplayDirNoteEnum) => setDisplay(val), []);

  return (
    <ModalCommon params="addFolderNote">
      <div>
        <div className="text-2xl ml mb-2 flex justify-between items-center">
          <span className="flex gap-3 justify-center items-center">
            {display !== DisplayDirNoteEnum.main && (
              <IoMdArrowRoundBack className="text-slate-700 hover:text-teal-600 duration-200" onClick={() => setDisplay(DisplayDirNoteEnum.main)} />
            )}
            <p>{label ? label : 'New'}</p>
          </span>
          <span className="hover:text-red-800 duration-200 text-slate-700" onClick={() => router.back()}>
            <IoClose />
          </span>
        </div>
        <hr className="border border-slate-700" />
        {display === DisplayDirNoteEnum.main && <MainDisplay displayCallback={displaySetterMethod} />}
        {display === DisplayDirNoteEnum.note && <CreateNoteDisplay displayCallback={displaySetterMethod} />}
        {display === DisplayDirNoteEnum.dir && <CreateFolderDisplay displayCallback={displaySetterMethod} />}
      </div>
    </ModalCommon>
  );
};

export default FolderNoteModal;

type DisplaysProps = {
  displayCallback: (val: DisplayDirNoteEnum) => void;
};

const MainDisplay = ({ displayCallback }: DisplaysProps) => {
  return (
    <div className="flex gap-3 w-full mt-4 mb-3">
      <div
        className="w-full flex justify-center items-center h-40 text-white hover:scale-[1.01] duration-150 bg-blue-800"
        onClick={() => displayCallback(DisplayDirNoteEnum.note)}
      >
        <div className="flex justify-center flex-col items-center">
          <AiFillFileAdd size={80} />
          <p>File</p>
        </div>
      </div>
      <div
        className="w-full flex justify-center items-center h-40 text-white hover:scale-[1.01] duration-200 bg-teal-600"
        onClick={() => displayCallback(DisplayDirNoteEnum.dir)}
      >
        <div className="flex justify-center flex-col items-center">
          <AiFillFolderAdd size={100} />
          <p className="-mt-[13px]">Folder</p>
        </div>
      </div>
    </div>
  );
};

const CreateNoteDisplay = ({ displayCallback }: DisplaysProps) => {
  const handleSubmit = () => {
    displayCallback(DisplayDirNoteEnum.main);
  };
  return (
    <div className="w-full">
      <div className="mt-3">
        <label className="mb-1 text-lg text-slate-500">Folder Designation</label>
        <select
          name=""
          placeholder=""
          className="w-full p-3 text-lg text-slate-300 border border-slate-800 rounded-lg bg-slate-900 focus:ring-slate-600 focus:border-slate-600"
        >
          <option value="">Chapters</option>
          <option value="">Research</option>
          <option value="">Brain Vomit</option>
        </select>
      </div>

      <div className="mt-2">
        <label className="mb-1 text-lg text-slate-500">Note Title</label>
        <input
          className="w-full p-2 text-lg text-slate-300 border border-slate-800 rounded-lg bg-slate-900 focus:ring-slate-600 focus:border-slate-600"
          name="synopsis"
        />
      </div>
      <div className="mb-1 w-full flex justify-end mt-6">
        <button type="submit" className="btn-blue py-3 px-5">
          Create Note
        </button>
      </div>
    </div>
  );
};

const CreateFolderDisplay = ({ displayCallback }: DisplaysProps) => {
  const handleSubmit = () => {
    displayCallback(DisplayDirNoteEnum.main);
  };
  return (
    <div className="w-full">
      <div className="mt-3">
        <label className="mb-1 text-lg text-slate-500">Folder Name</label>
        <input
          className="w-full p-2 text-lg text-slate-300 border border-slate-800 rounded-lg bg-slate-900 focus:ring-slate-600 focus:border-slate-600"
          name="synopsis"
        />
      </div>
      <div className="mb-1 w-full flex justify-end mt-6">
        <button type="submit" className="btn-blue py-3 px-5">
          Create Folder
        </button>
      </div>
    </div>
  );
};

// onChange={form.handleChange}
// <ErrorFieldCommon error={form.errors.synopsis} />
