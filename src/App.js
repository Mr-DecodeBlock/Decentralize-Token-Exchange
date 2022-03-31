import avtr from "./avrt-image.png";
import "./App.css";

export default function App() {
  return (
    <div className="bg-[#1A1D26] w-full h-screen font-Montserrat">
      <div>
        <nav className="bg-[#20232C] px-4 py-4 sm:w-full lg:w-3/12 lg:h-screen sm:flex sm:flex-row sm:justify-between sm:items-center">
          <p className="text-white text-lg">0xafd....88e8f</p>
          <img className="" src={avtr} alt="Display" width={40} />
        </nav>
      </div>
      {/* side bar for desktop */}
      {/* <div></div> */}
    </div>
  );
}
