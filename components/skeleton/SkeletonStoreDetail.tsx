import React from 'react';

const SkeletonStoreDetail = () => {
  return (
    <div className="p-4 flex flex-col animate-pulse">
      {/* Current Status */}
      <div className="mb-6 w-full flex flex-row justify-between mx-auto max-w-[32.8rem] space-x-4">
        <div className="inline-flex px-6 flex-col items-center justify-center">
          <div className="w-32 h-6 bg-gray-200 rounded mb-2" />
          <div className="w-12 h-6 bg-green-200 rounded-full" />
        </div>
        <div className="w-full h-24 bg-gray-200 rounded-lg" />
      </div>

      {/* Details Grid */}
      <div className="bg-gray-100 rounded-lg p-6 mb-6 w-full max-w-[32.8rem] mx-auto">
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[1, 2].map((_, index) => (
            <div key={index} className="text-center">
              <div className="w-full h-6 bg-gray-200 rounded mb-2" />
              <div className="w-3/4 h-8 bg-gray-300 rounded mx-auto" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="text-center">
              <div className="w-full h-6 bg-gray-200 rounded mb-2" />
              <div className="w-3/4 h-8 bg-gray-300 rounded mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden mb-2">
        <div className="absolute left-0 top-0 w-8 h-full bg-gray-200" />
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-200" />
        <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-100 animate-pulse" />
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between mt-2">
        <div className="w-12 h-4 bg-gray-200 rounded" />
        <div className="w-12 h-4 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default SkeletonStoreDetail;
