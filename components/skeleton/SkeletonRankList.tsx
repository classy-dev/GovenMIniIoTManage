import React from 'react';
import Card from '../Card';

const SkeletonRankList = ({ className = '' }) => {
  return (
    <Card
      title={<div className="w-64 h-6 bg-gray-200 rounded mb-3" />}
      className={`${className} animate-pulse`}
    >
      {/* Ranking List */}
      {[1, 2, 3].map(rank => (
        <div
          key={rank}
          className="w-full flex items-center justify-between py-3"
        >
          {/* Rank Number */}
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            {/* Item Name */}
            <div className="w-32 h-5 bg-gray-200 rounded" />
          </div>
          {/* Percentage */}
          <div className="w-16 h-5 bg-gray-200 rounded" />
          {/* Arrow */}
          <div className="w-4 h-4 bg-gray-200 rounded-full" />
        </div>
      ))}
    </Card>
  );
};

export default SkeletonRankList;
