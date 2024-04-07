export const parseIsoToDateOnly = (isoDateTimeString, short = true) => {
  const options = {
    short: {
      timeZone: "UTC",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    },
    long: {
      timeZone: "UTC",
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  };
  return new Date(isoDateTimeString).toLocaleString("en-GB", short ? options.short : options.long);
};
