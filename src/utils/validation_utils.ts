import * as Yup from 'yup';

export const isRequiredValidation = Yup.string().required('This field is required.');
export const isArrayValidation = Yup.array().required('This field is required.');
