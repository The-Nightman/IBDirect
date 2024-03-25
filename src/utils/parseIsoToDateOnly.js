export const parseIsoToDateOnly = (isoDateTimeString) => {
  return new Date(isoDateTimeString).toLocaleString("en-GB", {
    timeZone: "UTC",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
};
