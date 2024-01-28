import { Spinner } from "flowbite-react";

const SpinnerStatus = () => {
  return (
    <div
      role="status"
      className="absolute w-full h-[calc(100%_-_6rem)] flex justify-center items-center bg-slate-800/50 z-50"
    >
      <Spinner color="info" size="xl" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SpinnerStatus;
