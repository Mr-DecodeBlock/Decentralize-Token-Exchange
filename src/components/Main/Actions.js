import React, { useState } from "react";
import { connect } from "react-redux";
import {
  priceChartLoadedSelector,
  priceChartSelector,
} from "../../store/selectors";
import Modal from "../Modal";
import BuyModal from "./BuyModal";

const Actions = (props) => {
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState("");
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center  lg:py-3">
      <div className="flex flex-row space-x-3 items-center text-xl text-white">
        <p className="font-bold">DDAP/ETH</p>

        {props.priceChart.lastPriceChange === "+" ? (
          <h4 className={"text-green-500"}>
            <span>&#9650;</span> {props.priceChart.lastPrice}
          </h4>
        ) : (
          <h4 className={"text-red-400"}>
            <span>&#9660;</span> {props.priceChart.lastPrice}
          </h4>
        )}
      </div>
      <div>
        <div className="mx-0 mb-4 lg:mb-0 lg:mx-4 flex flex-row items-center justify-between space-x-4 ">
          <div
            onClick={() => {
              setOpen(!open);
              setComp(<BuyModal />);
            }}
            className="bg-[#26BEAF] px-5 py-1 cursor-pointer mt-4 text-white text-lg text-center rounded-md w-full space-y-4"
          >
            Make Order
          </div>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        {comp}
      </Modal>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    priceChartLoded: priceChartLoadedSelector(state),
    priceChart: priceChartSelector(state),
  };
}

export default connect(mapStateToProps)(Actions);
