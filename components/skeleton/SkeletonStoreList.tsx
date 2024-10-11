import React from 'react';

const ListItemSkeleton = () => (
  <div className="basis-full lg:basis-[calc(50%_-_0.4rem)] opacity-75 flex items-stretch bg-white border border-[#d4d4d4] rounded-lg overflow-hidden  mb-2">
    <div className="w-24 bg-gray-300 animate-pulse flex items-center justify-center">
      <div className="w-12 h-6 bg-gray-400 rounded" />
    </div>
    <div className="flex-grow p-6">
      <div className="w-40 h-6 bg-gray-400 rounded mb-2 animate-pulse" />
      <div className="w-64 h-5 bg-gray-400 rounded animate-pulse" />
    </div>
  </div>
);

const SkeletonStoreList = () => {
  return (
    <>
      {[...Array(20)].map((_, index) => (
        <ListItemSkeleton key={index} />
      ))}
    </>
  );
};

export default SkeletonStoreList;
