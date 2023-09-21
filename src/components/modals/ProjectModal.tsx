'use client';
import ModalCommon from '@src/components/common/ModalCommon';
import { useSearchParams, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSession } from 'next-auth/react';
import { isArrayValidation, isRequiredValidation } from '@src/utils/validation_utils';
import ErrorFieldCommon from '@src/components/common/ErrorFieldCommon';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { GENRE_OPTIONS } from '@src/utils/static_data_utils';
import { SelectValueType, colourStyles } from '@src/utils/select_styles_utils';
import { ImSpinner9 } from 'react-icons/im';

const animatedComponents = makeAnimated();

const validSchema = Yup.object({
  author: isRequiredValidation,
  title: isRequiredValidation,
  genre: isArrayValidation,
  synopsis: isRequiredValidation,
  image: isRequiredValidation
});

type ProjectModalProps = {
  onSuccessCallback?: () => void;
};

const ProjectModal = ({ onSuccessCallback }: ProjectModalProps) => {
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const label = useSearchParams().get('label');
  const imageRef = useRef<any>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      author: session?.user?.id,
      title: '',
      genre: '' ?? [],
      synopsis: '',
      image: ''
    },
    validationSchema: validSchema,
    onSubmit: async (values) => {
      setIsBusy(true);
      const dataForm = new FormData();
      dataForm.append('image', imageRef.current.files[0] as File);
      dataForm.append('author', values.author as string);
      dataForm.append('title', values.title as string);
      dataForm.append('genre', values.genre as string);
      dataForm.append('synopsis', values.synopsis as string);
      const response: Response = await fetch('/api/project', {
        method: 'POST',
        body: dataForm
      });
      if (response.ok) {
        if (onSuccessCallback) onSuccessCallback();
        setIsBusy(false);
        router.back();
        return;
      }
      setIsBusy(false);
      console.log('Error: ' + response.status);
    }
  });

  const handleMultiSelectChange = (value: SelectValueType[]) => {
    const arrayFinalVal: string[] = [];
    value.forEach((element: SelectValueType) => {
      arrayFinalVal.push(element.value);
    });

    if (arrayFinalVal.length === 0) {
      form.setFieldValue('genre', '');
      return;
    }

    form.setFieldValue('genre', arrayFinalVal);
  };

  return (
    <ModalCommon params="isProject">
      {isBusy ? (
        <div className="h-40 flex justify-center items-center flex-col gap-5">
          <p className="text-lg">Loading please wait...</p>
          <ImSpinner9 size={50} className="animate-spin text-teal-500" />
        </div>
      ) : (
        <div>
          <div className="text-2xl ml mb-2 flex justify-between items-center">
            <span>{label ? label : 'Create Project'}</span>
            <span className="hover:text-red-800 duration-200 text-slate-700" onClick={() => router.back()}>
              <IoClose />
            </span>
          </div>
          <hr className="border border-slate-700" />
          <div>
            <form onSubmit={form.handleSubmit}>
              <div className="mb-5">
                <div className="mt-2">
                  <label className="mb-1 text-lg text-slate-500">Project Title</label>
                  <input
                    className="w-full p-2 text-lg text-slate-300 border border-slate-800 rounded-lg bg-slate-900 focus:ring-slate-600 focus:border-slate-600"
                    type="text"
                    name="title"
                    onChange={form.handleChange}
                  />
                  <ErrorFieldCommon error={form.errors.title} />
                </div>

                <div className="mt-2">
                  <label className="mb-1 text-lg text-slate-500">Genre</label>
                  <Select
                    styles={colourStyles}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={GENRE_OPTIONS}
                    onChange={(e: any) => handleMultiSelectChange(e)}
                  />
                  <ErrorFieldCommon error={form.errors.genre} />
                </div>

                <div className="mt-2">
                  <label className="mb-1 text-lg text-slate-500">Synopsis</label>
                  <textarea
                    className="w-full p-2 text-lg text-slate-300 border border-slate-800 rounded-lg bg-slate-900 focus:ring-slate-600 focus:border-slate-600"
                    name="synopsis"
                    onChange={form.handleChange}
                  />
                  <ErrorFieldCommon error={form.errors.synopsis} />
                </div>

                <div className="mt-2 flex flex-col">
                  <label className="mb-1 text-lg text-slate-500">Upload Book Cover</label>
                  <div className="p-2 border rounded border-slate-800" onClick={() => imageRef.current.click()}>
                    <input ref={imageRef} onChange={form.handleChange} type="file" name="image" accept="image/png, image/jpeg" />
                  </div>
                  <ErrorFieldCommon error={form.errors.image} />
                </div>
              </div>

              <div className="mb-1 w-full flex justify-end">
                <button type="submit" className="btn-blue py-3 px-5">
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ModalCommon>
  );
};

export default ProjectModal;
