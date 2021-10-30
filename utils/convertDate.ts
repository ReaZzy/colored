export const convertDate = (inputFormat?: string) => {
  const pad = (s: number) => {
    return s < 10 ? '0' + s : s;
  };
  const date = new Date(inputFormat || '');
  return [
    pad(date.getDate()),
    pad(date.getMonth() + 1),
    date.getFullYear(),
  ].join('.');
};
