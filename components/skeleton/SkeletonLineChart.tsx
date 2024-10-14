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

// const LineChartSkeleton = () => {
//   return (
//     <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
//       {/* Chart Title */}
//       <div className="w-64 h-6 bg-gray-200 rounded mb-8" />

//       {/* Chart Area */}
//       <div className="relative h-64 mb-4">
//         {/* Y-axis */}
//         <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between items-end pr-2">
//           <div className="w-8 h-3 bg-gray-200 rounded" />
//           <div className="w-8 h-3 bg-gray-200 rounded" />
//         </div>

//         {/* Chart Line */}
//         <svg
//           className="absolute inset-0 w-full h-full"
//           preserveAspectRatio="none"
//         >
//           <path
//             d="M50,180 Q100,160 150,170 T250,150 T350,160 T450,140 T550,20 T650,140 T750,130"
//             fill="none"
//             stroke="#F2D2D2"
//             strokeWidth="3"
//           />
//         </svg>

//         {/* Chart Area Fill */}
//         <div className="absolute inset-0 ml-12 bg-gradient-to-b from-red-100 to-white rounded-lg" />
//       </div>

//       {/* X-axis */}
//       <div className="ml-12 flex justify-between">
//         {[...Array(6)].map((_, index) => (
//           <div key={index} className="w-16 h-4 bg-gray-200 rounded" />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LineChartSkeleton;
