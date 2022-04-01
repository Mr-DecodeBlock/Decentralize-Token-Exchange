import React from "react";
import MarketSummary from "./MarketSummary";
import OrderBook from "./OrderBook";
import Transaction from "./Transaction";

const Main = () => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <main className=" w-full lg:w-9/12 p-4">
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
      <div class="grid lg:grid-cols-3 gap-4 grid-cols-1 lg:gap-4">
        <MarketSummary />
        <OrderBook />
        <Transaction />
        <div className="bg-[#20232C] p-4 rounded-md text-white">
          <p className="text-lg mb-5">Trades</p>
          <div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#1A1D26] dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3"></th>
                    <th scope="col" class="px-6 py-3">
                      DDAP
                    </th>
                    <th scope="col" class="px-6 py-3">
                      DDAP/ETH
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-[#20232C] even:dark:bg-[#1A1D26]">
                    <td class="px-6 py-4">9:00am</td>
                    <td class="px-6 py-4">20</td>
                    <td class="px-6 py-4">0.01</td>
                  </tr>
                  <tr class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-[#20232C] even:dark:bg-[#1A1D26]">
                    <td class="px-6 py-4">9:00am</td>
                    <td class="px-6 py-4">20</td>
                    <td class="px-6 py-4">0.01</td>
                  </tr>
                  <tr class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-[#20232C] even:dark:bg-[#1A1D26]">
                    <td class="px-6 py-4">9:00am</td>
                    <td class="px-6 py-4">20</td>
                    <td class="px-6 py-4">0.01</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
