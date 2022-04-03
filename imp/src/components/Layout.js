import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="bg-[#1A1D26] w-full  font-Montserrat">
      <div className="flex flex-col lg:flex lg:flex-row ">{children}</div>
    </div>
  );
};

export default Layout;
