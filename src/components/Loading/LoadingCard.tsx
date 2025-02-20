import React from "react";

const LoadingCard = () => {
  return (
    <div className="grid grid-cols-7 gap-4 p-3 rounded-md h-[280px] overflow-hidden border animate-pulse">
      <div className="col-span-3 bg-gray-300/70 rounded-md"></div>
      <div className="col-span-4 flex flex-col gap-y-3">
        <div className="w-full h-10 bg-gray-300/50 rounded-md"></div>
        <div className="flex justify-between gap-5">
          <div className="w-full h-5 bg-gray-300/50 rounded-md"></div>
          <div className="w-full h-5 bg-gray-300/50 rounded-md"></div>
        </div>
        <div className="w-full h-5 bg-gray-300/50 rounded-md"></div>
        <div className="w-full h-5 bg-gray-300/50 rounded-md"></div>

        <div className="grid grid-cols-3 flex-wrap gap-4">
          <div className="w-full h-8 bg-gray-300/50 rounded-md"></div>
          <div className="w-full h-8 bg-gray-300/50 rounded-md"></div>
          <div className="w-full h-8 bg-gray-300/50 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
