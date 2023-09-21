import { StylesConfig } from 'react-select';

export type SelectValueType = {
  label: string;
  value: string;
};

export const colourStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
    color: '#1E293B',
    padding: 4,
    borderRadius: 8,
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#1E293B'
    }
  }),
  indicatorSeparator: (styles) => ({ ...styles, backgroundColor: '#1E293B' }),
  dropdownIndicator: (base) => ({
    ...base,
    color: '#717987', // Custom colour
    '&:hover': {
      color: '#0D9488'
    }
  }),

  menu: (styles) => ({
    ...styles,
    backgroundColor: '#172037'
  }),
  container: (styles) => ({
    ...styles,
    color: '#717987',
    backgroundColor: '#0F172A'
  }),
  option: (styles) => {
    return {
      ...styles,
      color: '#717987',
      backgroundColor: '#172037'
    };
  },
  input: (styles) => ({
    ...styles,
    borderColor: '#1E293B',
    backgroundColor: '#0F172A',
    color: '#C2D1E7'
  }),
  placeholder: (styles) => ({ ...styles, color: '#717987' }),
  singleValue: (styles) => ({
    ...styles,
    color: '#717987',
    backgroundColor: '#0F172A'
  })
};
