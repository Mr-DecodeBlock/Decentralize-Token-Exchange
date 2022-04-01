import React from "react";
import Chart from "react-apexcharts";
import { chartOptions, dummyData } from "../PriceChartConfig";

const Main = () => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <div>
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
          <div className="bg-[#20232C] p-4 lg:col-span-2 rounded-md text-white">
            <p className="text-lg">Market Summary</p>
            <Chart
              options={chartOptions}
              series={dummyData}
              type="candlestick"
              width="100%"
              height="350"
            />
          </div>
          <div className="bg-[#20232C] p-4 rounded-md text-white">
            <p className="text-lg mb-5">Order Book</p>
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
          <div className="bg-[#20232C] p-4 lg:col-span-2 rounded-md text-white">
            <p className="text-lg">My Transaction </p>
            <div className="flex flex-row justify-end mb-5  items-center space-x-8 cursor-pointer">
              <div
                onClick={() => {
                  setOpenTab(1);
                }}
                className={
                  openTab === 1
                    ? `class="inline-block p-0 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500`
                    : ""
                }
              >
                Trade
              </div>
              <div
                onClick={() => {
                  setOpenTab(2);
                }}
                className={
                  openTab === 2
                    ? `class="inline-block p-0 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500`
                    : ""
                }
              >
                Order
              </div>
            </div>
            {openTab === 1 ? (
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
            ) : (
              ""
            )}
            {openTab === 2 ? (
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
            ) : (
              ""
            )}
          </div>
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
    </div>
  );
};

export default Main;
