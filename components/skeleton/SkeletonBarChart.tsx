import React from 'react';
import Card from '../Card';

const SkeletonBarChart = ({ className = '' }) => {
  const barHeights = [
    'h-16',
    'h-32',
    'h-24',
    'h-40',
    'h-20',
    'h-36',
    'h-28',
    'h-12',
  ];
  return (
    <Card
      className={`${className} animate-pulse`}
      title={<div className="w-32 h-6 bg-gray-200 rounded" />}
      sub={<div className="w-24 h-5 bg-gray-200 rounded" />}
    >
      {/* Chart Area */}
      <div className="w-full h-80 mb-4">
        {/* Bars */}
        <div className=" h-full flex items-end justify-between">
          {barHeights.map((height, index) => (
            <div
              key={index}
              className={`w-12 bg-gray-200 rounded-t ${height}`}
            />
          ))}
        </div>
      </div>

      {/* X-axis */}
      <div className="w-full flex justify-between">
        {barHeights.map((_, index) => (
          <div key={index} className="w-12 h-4 bg-gray-200 rounded" />
        ))}
      </div>
    </Card>
  );
};

export default SkeletonBarChart;
