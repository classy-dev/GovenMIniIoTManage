import React from 'react';
import Card from '../Card';

const SkeletonLineChart = ({ className = '' }) => {
  return (
    <Card
      className={`${className} p-6 animate-pulse`}
      title={<div className="w-64 h-6 bg-gray-200 rounded mb-8" />}
    >
      {/* Chart Area */}
      <div className="relative w-full p-4 mb-6 h-80">
        {/* Linear Chart Line */}
        <svg
          className="absolute inset-0 w-full h-full "
          viewBox="0 0 800 256"
          preserveAspectRatio="none"
        >
          <polyline
            points="0,160 160,100 320,140 480,80 640,120 800,60"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="3"
          />
        </svg>

        {/* Subtle Chart Area Fill */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-white opacity-50" />
      </div>

      {/* X-axis */}
      <div className="w-full flex justify-between">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="w-12 h-4 bg-gray-200 rounded" />
        ))}
      </div>
    </Card>
  );
};

export default SkeletonLineChart;
