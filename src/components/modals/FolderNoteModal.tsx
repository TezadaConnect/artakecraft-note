import React, { memo, useCallback, useMemo, useState } from 'react';
import ModalCommon from '../common/ModalCommon';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { IoClose } from 'react-icons/io5';
import { AiFillFileAdd, AiFillFolderAdd } from 'react-icons/ai';
import { DisplayDirNoteEnum } from '@src/utils/enums_utils';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { isRequiredValidation } from '@src/utils/validation_utils';
import { ImSpinner9 } from 'react-icons/im';
import ErrorFieldCommon from '../common/ErrorFieldCommon';
import { useCreateFolderMutation, useCreateNotesMutation } from '@src/redux/api_features/api_project_slice';
import { useSelector } from 'react-redux';
import { RootState } from '@src/redux/store';
import { FolderType } from '@src/types/folder_type';
import { OptionSelect } from '@src/types/others';

type FolderNoteModalProp = {
  // onCreateCallback: () => void;
};

const FolderNoteModal = ({}: FolderNoteModalProp) => {
  const [display, setDisplay] = useState<DisplayDirNoteEnum>(DisplayDirNoteEnum.main);
  const label = useSearchParams().get('label');
  const router: AppRouterInstance = useRouter();
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const displaySetterMethod = useCallback((val: DisplayDirNoteEnum) => setDisplay(val), []);
  const displayLoadScreen = useCallback((val: boolean) => setIsBusy(val), []);

  return (
    <ModalCommon params="addFolderNote" isBusy={isBusy}>
      {isBusy ? (
        <div className="h-40 flex justify-center items-center flex-col gap-5">
          <p className="text-lg">Loading please wait...</p>
          <ImSpinner9 size={50} className="animate-spin text-teal-500" />
        </div>
      ) : (
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
          {display === DisplayDirNoteEnum.note && <CreateNoteDisplay displayCallback={displaySetterMethod} loadCallback={displayLoadScreen} />}
          {display === DisplayDirNoteEnum.dir && <CreateFolderDisplay displayCallback={displaySetterMethod} loadCallback={displayLoadScreen} />}
        </div>
      )}
    </ModalCommon>
  );
};

export default memo(FolderNoteModal);

type DisplaysProps = {
  displayCallback: (val: DisplayDirNoteEnum) => void;
  loadCallback?: (val: boolean) => void;
};

const MainDisplay = ({ displayCallback }: DisplaysProps) => {
  return (
    <div className="flex gap-3 w-full mt-4 mb-3">
      <div
        className="w-full flex justify-center items-center h-40 text-white hover:scale-[1.03] duration-150 bg-blue-800"
        onClick={() => displayCallback(DisplayDirNoteEnum.note)}
      >
        <div className="flex justify-center flex-col items-center">
          <AiFillFileAdd size={80} />
          <p>File</p>
        </div>
      </div>
      <div
        className="w-full flex justify-center items-center h-40 text-white hover:scale-[1.03] duration-200 bg-teal-600"
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

const CreateNoteDisplay = ({ displayCallback, loadCallback }: DisplaysProps) => {
  const { projectInfo } = useSelector((state: RootState) => state.editor);
  const router = useRouter();
  const [create] = useCreateNotesMutation();

  const options: OptionSelect[] = useMemo(() => {
    const arrHolder: OptionSelect[] = [];
    const folders: FolderType[] = projectInfo?.folders;
    folders?.forEach((item) => {
      arrHolder.push({
        value: item._id,
        label: item.name
      });
    });
    return arrHolder;
  }, [projectInfo?.folders]);

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: '',
      folderId: options[0].value
    },
    validationSchema: Yup.object({
      folderId: isRequiredValidation,
      title: isRequiredValidation
    }),
    onSubmit: async (values) => {
      loadModal(true);
      try {
        await create({ ...values }).unwrap();
        router.back();
        displayCallback(DisplayDirNoteEnum.main);
      } catch (error) {
        console.log(error);
      }
      loadModal(false);
    }
  });

  const loadModal = (val: boolean) => loadCallback && loadCallback(val);

  return (
    <div className="w-full">
      <form onSubmit={form.handleSubmit} className="w-full">
        <div className="mt-3">
          <label className="mb-1 text-lg text-slate-500">Folder Designation</label>
          <select
            name="folderId"
            placeholder="Choose Folder"
            value={form.values.folderId}
            onChange={form.handleChange}
            className="w-full p-3 text-lg text-slate-300 border border-slate-800 rounded-lg bg-slate-900 focus:ring-slate-600 focus:border-slate-600"
          >
            {options.map((item, key) => (
              <option value={item.value} key={item.value} selected={key === 0}>
                {item.label}
              </option>
            ))}
          </select>
          <ErrorFieldCommon error={form.errors.folderId} />
        </div>

        <div className="mt-2">
          <label className="mb-1 text-lg text-slate-500">Note Title</label>
          <input
            className="w-full p-2 text-lg text-slate-300 border border-slate-800 rounded-lg bg-slate-900 focus:ring-slate-600 focus:border-slate-600"
            name="title"
            value={form.values.title}
            onChange={form.handleChange}
          />
          <ErrorFieldCommon error={form.errors.title} />
        </div>
        <div className="mb-1 w-full flex justify-end mt-6">
          <button type="submit" className="btn-blue py-3 px-5">
            Create Note
          </button>
        </div>
      </form>
    </div>
  );
};

const CreateFolderDisplay = ({ displayCallback, loadCallback }: DisplaysProps) => {
  const { id } = useParams();
  const [create] = useCreateFolderMutation();
  const router = useRouter();
  const loadingSetter = (val: boolean) => loadCallback && loadCallback(val);

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      projectId: id
    },
    validationSchema: Yup.object({
      name: isRequiredValidation,
      projectId: isRequiredValidation
    }),
    onSubmit: async (values) => {
      loadingSetter(true);
      try {
        await create({ ...values }).unwrap();
        displayCallback(DisplayDirNoteEnum.main);
        router.back();
      } catch (error) {
        console.log(error);
      }
      loadingSetter(false);
    }
  });

  return (
    <div className="w-full">
      <form className="w-full" onSubmit={form.handleSubmit}>
        <div className="mt-3">
          <label className="mb-1 text-lg text-slate-500">Folder Name</label>
          <input
            className="w-full p-2 text-lg text-slate-300 border border-slate-800 rounded-lg bg-slate-900 focus:ring-slate-600 focus:border-slate-600"
            name="name"
            value={form.values.name}
            onChange={form.handleChange}
          />
          <ErrorFieldCommon error={form.errors.name} />
        </div>
        <div className="mb-1 w-full flex justify-end mt-6">
          <button type="submit" className="btn-blue py-3 px-5">
            Create Folder
          </button>
        </div>
      </form>
    </div>
  );
};
