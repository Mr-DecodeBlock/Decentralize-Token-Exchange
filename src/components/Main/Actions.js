import React from "react";

const Actions = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center  lg:py-3">
      <div className="flex flex-row space-x-3 items-center text-xl text-white">
        <p className="font-bold">DDAP/ETH</p>

        <p className="font-bold  text-green-600"> 0.01</p>
      </div>
      <div>
        <div className="mx-0 mb-4 lg:mb-0 lg:mx-4 flex flex-row items-center justify-between space-x-4 ">
          <div className="bg-[#26BEAF] px-5 py-1 cursor-pointer mt-4 text-white text-lg text-center rounded-md w-full space-y-4">
            Buy
          </div>
          <div className="bg-[#4743D6] px-5 py-1 cursor-pointer mt-4 text-white text-lg text-center rounded-md w-full space-y-4">
            Sell
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actions;
