import React from "react";

const Spinner = () => {
  return (
    <div className="flex h-screen items-center justify-center space-x-2">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-400"></div>
    </div>
  );
};

export default Spinner;
