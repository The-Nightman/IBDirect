export const parseDate = (date, short = false) => {
  const formattedDate = date.split("-").reverse();
  if (short === true) {
    formattedDate[formattedDate.length - 1] =
      formattedDate[formattedDate.length - 1].slice(-2);
  }

  return formattedDate.join("/");
};
