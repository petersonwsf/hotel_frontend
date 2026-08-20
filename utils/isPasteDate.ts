export const isPastDate = (date: string | Date | number): boolean => {
  const inputDate = new Date(date);
  const today = new Date();

  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return inputDate.getTime() < today.getTime();
};