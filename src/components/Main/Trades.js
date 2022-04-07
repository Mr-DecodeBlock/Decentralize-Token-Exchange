import React from "react";
import { connect } from "react-redux";
// import { filledOrdersLoaded } from "../../store/actions";
import {
  filledOrdersLoadedSelector,
  filledOrdersSelector,
} from "../../store/selectors";

const Trades = (props) => {
  const renderTradesTable = (filledOrders) => {
    return filledOrders.map((orders, index) => (
      <tr
        key={index}
        class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-[#20232C] even:dark:bg-[#1A1D26]"
      >
        <td class="px-2 py-4">{orders.formattedTimestamp}</td>
        <td class="px-2 py-4">{orders.tokenPrice}</td>
        <td
          class={
            orders.tokenPriceClass === "success"
              ? "px-2 py-4 text-green-500"
              : " px-2 py-4 text-red-500"
          }
        >
          {orders.tokenAmount}
        </td>
      </tr>
    ));
  };

  return (
    <div className="bg-[#20232C] w-full lg:w-3/12 p-4 rounded-md text-white">
      <p className="text-lg mb-5">Trades</p>
      <div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#1A1D26] dark:text-gray-400">
              <tr>
                <th scope="col" class="px-2 py-3">
                  TIME
                </th>
                <th scope="col" class="px-2 py-3">
                  DDAP
                </th>
                <th scope="col" class="px-2 py-3">
                  DDAP/ETH
                </th>
              </tr>
            </thead>
            <tbody>
              {props.fillOrdersLoaded
                ? renderTradesTable(props.filledOrders)
                : "Loading"}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    fillOrdersLoaded: filledOrdersLoadedSelector(state),
    filledOrders: filledOrdersSelector(state),
  };
}

export default connect(mapStateToProps)(Trades);
