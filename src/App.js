import avtr from "./avrt-image.png";
import eth from "./ethereum-eth.svg";
import "./App.css";

export default function App() {
  return (
    <div className="bg-[#1A1D26] w-full h-screen font-Montserrat">
      <div>
        <nav className="bg-[#20232C] lg:p-4 sm:w-full lg:w-3/12 lg:h-screen ">
          <div className="px-4 py-4 flex flex-row justify-between items-center lg:flex-col-reverse lg:justify-end lg:py-8 ">
            <p className="text-white text-lg">0xafd....88e8f</p>
            <img className="lg:mb-4" src={avtr} alt="Display" width={40} />
          </div>
          <div className="hidden lg:block">
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
            <div>
              <div className="bg-[#FA3E66] py-2 mt-14 text-white text-lg text-center rounded-md w-full space-y-4">
                Deposite
              </div>
              <div className="bg-[#02B156] py-2 mt-4 text-white text-lg text-center rounded-md w-full space-y-4">
                Withdraw
              </div>
            </div>
          </div>
        </nav>
        <div className="mx-4 lg:hidden">
          <div className=" mt-5 lg:w-full lg:mx-0 lg:block p-4 rounded-md   bg-[#4181DB]">
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
          <div>
            <div className="bg-[#FA3E66] py-3 mt-4 text-white text-lg text-center rounded-md w-full space-y-4">
              Deposite
            </div>
            <div className="bg-[#02B156] py-3 mt-4 text-white text-lg text-center rounded-md w-full space-y-4">
              Withdraw
            </div>
          </div>
        </div>
      </div>
      {/* side bar for desktop */}
      {/* <div></div> */}
    </div>
  );
}
