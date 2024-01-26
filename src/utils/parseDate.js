export const parseDate = (date) => {
  return date.split("-").reverse().join("/");
};
