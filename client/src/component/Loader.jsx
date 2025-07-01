import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-5 z-50">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-blue-500 font-bold text-lg">Loading</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
