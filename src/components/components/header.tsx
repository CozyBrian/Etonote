import React from "react";

const Header = () => {
  return (
    <div className="pb-8 select-none">
      <div className="flex flex-row">
        <h1 className="text-xl font-medium">Good Morning, Brian</h1>
        <div className="fixed">
          <div className="h-6 w-6 border-2 border-sky-500 rounded-md mx-2 relative right-16 top-1"></div>
        </div>
      </div>
      <h1 className="text-gray-600 text-xl font-medium">It's Friday, Sept 2</h1>
    </div>
  );
};

export default Header;
