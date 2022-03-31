import avtr from "./avrt-image.png";
import eth from "./ethereum-eth.svg";
import Chart from "react-apexcharts";
import "./App.css";
import { chartOptions, dummyData } from "./components/PriceChartConfig";

export default function App() {
  return (
    <div className="bg-[#1A1D26] w-full h-screen font-Montserrat">
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
              <div className="bg-[#FA3E66] py-2 cursor-pointer mt-4 text-white text-lg text-center rounded-md w-full space-y-4">
                Deposite
              </div>
              <div className="bg-[#02B156] py-2 cursor-pointer mt-4 text-white text-lg text-center rounded-md w-full space-y-4">
                Withdraw
              </div>
            </div>
          </div>
        </nav>

        <main className="w-9/12 p-4">
          <div class="grid grid-cols-3 gap-4">
            <div className="bg-[#20232C] p-4 col-span-2 rounded-md text-white">
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
              <p className="text-lg">Market Summary</p>
            </div>
            <div className="bg-[#20232C] p-4 col-span-2 rounded-md text-white">
              <p className="text-lg">My Transaction </p>
              <div className="flex flex-row justify-end items-center space-x-4">
                <div class="border-b border-gray-200 dark:border-gray-700">
                  <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li class="mr-2">
                      <a
                        href="#"
                        class="active inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
                        aria-current="page"
                      >
                        Trade
                      </a>
                    </li>
                    <li class="mr-2">
                      <a
                        href="#"
                        class="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
                      >
                        Order
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-[#20232C] rounded-md text-white">
              <p>transactions</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
