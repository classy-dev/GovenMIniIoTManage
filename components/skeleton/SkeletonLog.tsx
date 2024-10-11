const SkeletonLog = () => {
  return (
    <>
      {[...Array(10)].map((_, index) => (
        <li key={index} className="flex items-start">
          <div className="w-[4.2rem] h-8 bg-gray-200 rounded mr-2" />
          <div className="flex-grow h-8 bg-gray-200 rounded" />
        </li>
      ))}
    </>
  );
};

export default SkeletonLog;
