import avtr from "./avrt-image.png";
import eth from "./eth.png";
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
          <div>
            <div className="hidden lg:block p-4 rounded-md w-full  bg-[#4181DB]">
              <div className="flex flex-row justify-between">
                <div className="py-3 text-white">
                  <p className="font-bold">Total Balance</p>
                  <p className="font-bold text-xl">0.00123</p>
                  <p>DDAP</p>
                </div>
                {/* <img
                  // className="w-40 h-20"
                  src={eth}
                  alt="Display"
                /> */}
              </div>
            </div>
          </div>
        </nav>
      </div>
      {/* side bar for desktop */}
      {/* <div></div> */}
    </div>
  );
}
