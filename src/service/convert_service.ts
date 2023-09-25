export const htmlStingToStr = (HtmlStr: string): string => {
  const returnValue: string = HtmlStr?.replace(/<[^>]+>/g, '') ?? '';
  return returnValue;
};

export const dateHumanReadable = (date: string) => {
  const readable = new Date(date);
  return readable.toLocaleDateString();
};
