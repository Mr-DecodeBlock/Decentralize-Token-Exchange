import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import avtr from "./avrt-image.png";
import eth from "./ethereum-eth.svg";
import Chart from "react-apexcharts";
import "./App.css";
import { chartOptions, dummyData } from "./components/PriceChartConfig";
import Modal from "./components/Modal";
import Comp from "./components/Comp";

export default function App() {
  const [openTab, setOpenTab] = React.useState(1);
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState("");

  const cancelButtonRef = useRef(null);

  return (
    <div className="bg-[#1A1D26] w-full  font-Montserrat">
      <div className="flex flex-col lg:flex lg:flex-row ">
        <nav className="bg-transparent lg:bg-[#20232C] lg:p-4 lg:w-3/12 lg:h-screen ">
          <div className="bg-[#20232C] lg:bg-transparent sm:w-full  px-4 py-4 flex flex-row justify-between items-center lg:flex-col-reverse lg:justify-end lg:py-8 ">
            <p className="text-white text-lg">0xafd....88e8f</p>
            <img className="lg:mb-4" src={avtr} alt="Display" width={40} />
          </div>
          <hr className="hidden lg:block opacity-20 mt-8" />
          <div className=" lg:block">
            <div className="mx-4 mt-5 lg:w-full lg:mx-0 lg:block p-4 rounded-md   bg-[#4181DB]">
              <div className="flex flex-row justify-between items-center">
                <div className="py-6 text-white">
                  <p className="font-bold">Total Balance</p>
                  <p className="font-bold text-xl">0.00123</p>
                  <p className="bg-yellow-400 font-bold text-black rounded-full text-center w-16">
                    DDAP
                  </p>
                </div>
                <img className="w-20 h-20" src={eth} alt="Display" />
              </div>
            </div>
            <hr className="hidden lg:block opacity-20 mt-8" />
            <div className="mx-4 lg:mx-0 flex flex-row items-center justify-between space-x-4 lg:flex lg:flex-col lg:space-x-0">
              <div
                onClick={() => {
                  setOpen(!open);

                  // console.log(open);
                  setComp(<Comp />);
                }}
                className="bg-[#FA3E66] py-2 cursor-pointer mt-4 text-white text-lg text-center rounded-md w-full space-y-4"
              >
                Deposite
              </div>
              <div className="bg-[#02B156] py-2 cursor-pointer mt-4 text-white text-lg text-center rounded-md w-full space-y-4">
                Withdraw
              </div>
            </div>
          </div>
        </nav>

        <main className=" w-full lg:w-9/12 p-4">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center  lg:py-3">
            <div className="flex flex-row space-x-3 items-center text-xl text-white">
              <p className="font-bold">DDAP/ETH</p>
              {/* <div class="w-16 overflow-hidden inline-block">
                <div class=" h-5 w-5 bg-black rotate-45 transform origin-bottom-left"></div>
  </div> */}
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

        <Modal open={open}>{comp}</Modal>
      </div>
    </div>
  );
}
