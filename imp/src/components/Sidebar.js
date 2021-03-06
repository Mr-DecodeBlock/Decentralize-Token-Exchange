import React, { useState } from "react";
import { connect } from "react-redux";
import Modal from "./Modal";
import DepositeModal from "./DepositeModal";
import WithdrawModal from "./WithdrawModal";
import { accountSelector } from "../store/selectors";

const Sidebar = (props) => {
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState("");
  return (
    <nav className="bg-transparent  lg:bg-[#20232C] lg:p-4 lg:w-3/12  ">
      <div className="bg-[#20232C] lg:bg-transparent sm:w-full  px-4 py-4 flex flex-row justify-between items-center lg:flex-col-reverse lg:justify-end lg:py-8 ">
        <p className="text-white text-lg">
          {props.account.substring(0, 5) +
            "..." +
            props.account.substring(30, props.account.length)}
        </p>
        <img
          className="lg:mb-4"
          src="/images/avrt-image.png"
          alt="Display"
          width={40}
        />
      </div>
      <hr className="hidden lg:block opacity-20 mt-8" />
      <div className="lg:block">
        <div className="mx-4 mt-5 lg:w-full lg:mx-0 lg:block p-4 rounded-md   bg-[#4181DB]">
          <div className="flex flex-row justify-between items-center">
            <div className="py-6 text-white">
              <p className="font-bold">Total Balance</p>
              <p className="font-bold text-xl">0.00123</p>
              <p className="bg-yellow-400 font-bold text-black rounded-full text-center w-16">
                DDAP
              </p>
            </div>
            <img
              className="w-20 h-20"
              src="/images/ethereum-eth.svg"
              alt="Display"
            />
          </div>
        </div>
        <hr className="hidden lg:block opacity-20 mt-8" />
        <div className="mx-4 lg:mx-0 flex flex-row items-center justify-between space-x-4 lg:flex lg:flex-col lg:space-x-0">
          <div
            onClick={() => {
              setOpen(!open);
              setComp(<DepositeModal />);
            }}
            className="bg-[#FA3E66] py-2 cursor-pointer mt-4 text-white text-lg text-center rounded-md w-full space-y-4"
          >
            Deposite
          </div>
          <div
            onClick={() => {
              setOpen(!open);
              setComp(<WithdrawModal />);
            }}
            className="bg-[#02B156] py-2 cursor-pointer mt-4 text-white text-lg text-center rounded-md w-full space-y-4"
          >
            Withdraw
          </div>
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        {comp}
      </Modal>
    </nav>
  );
};

function mapStateToProps(state) {
  // console.log(state);
  return {
    account: accountSelector(state),
    // contractsLoaded: contractsLoadedSelector(state)
  };
}

export default connect(mapStateToProps)(Sidebar);
