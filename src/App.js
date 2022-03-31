import avtr from "./avrt-image.png";
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
            <div className="hidden lg:flex rounded-md w-full h-24 bg-gradient-to-r from-cyan-500 to-blue-500">
              fdsfsdffdsfdf
            </div>
            <div className="rounded-full text-center py-2 px-5 text-lg w-6/12 cursor-default bg-gradient-to-r from-pink-500 to-yellow-500 ">
              <p>Get Started</p>
            </div>
          </div>
        </nav>
      </div>
      {/* side bar for desktop */}
      {/* <div></div> */}
    </div>
  );
}
