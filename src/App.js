import logo from "./logo.svg";
import "./App.css";

export default function App() {
  return (
    <div className="bg-[#1A1D26] w-full h-full font-Montserrat">
      <nav className="bg-[#20232C] px-4 py-4 w-full flex flex-row justify-between items-center">
        <p className="text-white text-lg">0xafd....88e8f</p>

        {/* <div className="bg-avrt-image rounded-full w-8 h-8"></div> */}
        <img className="" src={require("./avrt-image.jpg")} alt="Display" />
      </nav>
    </div>
  );
}
