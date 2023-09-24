export const htmlToStr = (str: string): string => {
  const returnValue: string = str?.replace(/<[^>]+>/g, '') ?? '';
  return returnValue;
};
