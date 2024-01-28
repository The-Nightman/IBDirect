const SkeletonPatientCard = () => {
  return (
    <div
      role="status"
      className="grid grid-cols-[25%_20%_auto_20%_10%] h-14 px-4 shadow animate-pulse items-center"
    >
      <div className="h-2.5 bg-gray-400 rounded-full w-28 mb-2.5" />
      <div className="h-2.5 bg-gray-400 rounded-full w-20 mb-2.5" />
      <div className="h-2.5 bg-gray-400 rounded-full w-14 mb-2.5" />
      <div className="h-2.5 bg-gray-400 rounded-full w-10 mb-2.5" />
      <div className="h-2.5 bg-gray-400 rounded-full w-16 mb-2.5" />
    </div>
  );
};

export default SkeletonPatientCard;
