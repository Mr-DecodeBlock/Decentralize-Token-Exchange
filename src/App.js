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
                <ul
                  class="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
                  id="tabs-tab"
                  role="tablist"
                >
                  <li class="nav-item" role="presentation">
                    <a
                      href="#tabs-home"
                      class="
      nav-link
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
     
      focus:border-transparent
      active
    "
                      id="tabs-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#tabs-home"
                      role="tab"
                      aria-controls="tabs-home"
                      aria-selected="true"
                    >
                      Trade
                    </a>
                  </li>
                  <li class="nav-item" role="presentation">
                    <a
                      href="#tabs-profile"
                      class="
      nav-link
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
     
      focus:border-transparent
    "
                      id="tabs-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#tabs-profile"
                      role="tab"
                      aria-controls="tabs-profile"
                      aria-selected="false"
                    >
                      Order
                    </a>
                  </li>
                </ul>
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
