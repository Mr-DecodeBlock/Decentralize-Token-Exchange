import React, { useEffect } from "react";
import { ethers, providers } from "ethers";
import Web3Modal from "web3modal";
import { connect } from "react-redux";
import { loadAllOrders } from "../../store/interactions";
import {
  exchangeSelector,
  orderBookLoadedSelector,
  orderBookSelector,
} from "../../store/selectors";

const OrderBook = (props) => {
  const { orderBook } = props;
  // console.log(props);
  const renderSellOrderTable = (sellOrder) => {
    return sellOrder.map((orders, index) => (
      <tr
        key={index}
        class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-[#20232C] even:dark:bg-[#1A1D26]"
      >
        <td class="px-4 py-4">{orders.tokenAmount}</td>
        <td
          class={
            orders.orderTypeClass === "success"
              ? "px-4 py-4 text-green-500"
              : " px-4 py-4 text-red-500"
          }
        >
          {orders.tokenPrice}
        </td>
        <td class="px-4 py-4">{orders.etherAmount}</td>
      </tr>
    ));
  };

  const renderBuyOrderTable = (buyOrder) => {
    return buyOrder.map((orders, index) => (
      <tr
        key={index}
        class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-[#20232C] even:dark:bg-[#1A1D26]"
      >
        <td class="px-4 py-4">{orders.tokenAmount}</td>
        <td
          class={
            orders.orderTypeClass === "success"
              ? "px-4 py-4 text-green-500"
              : " px-4 py-4 text-red-500"
          }
        >
          {orders.tokenPrice}
        </td>
        <td class="px-4 py-4">{orders.etherAmount}</td>
      </tr>
    ));
  };
  return (
    <div className="bg-[#20232C] w-full lg:w-3/12 p-4 rounded-md text-white">
      <p className="text-lg mb-5">Order Book</p>
      <div>
        <div class=" relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full  text-sm text-left  text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#1A1D26] dark:text-gray-400">
              <tr>
                <th scope="col" class="px-4 py-3">
                  TIME
                </th>
                <th scope="col" class="px-4 py-3">
                  DDAP
                </th>
                <th scope="col" class="px-4 py-3">
                  DDAP/ETH
                </th>
              </tr>
            </thead>
            <tbody>
              {props.showOrderBook
                ? renderSellOrderTable(orderBook.sellOrders)
                : "Loading"}

              {props.showOrderBook
                ? renderBuyOrderTable(orderBook.buyOrders)
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
    // exchange: exchangeSelector(state),
    orderBook: orderBookSelector(state),
    showOrderBook: orderBookLoadedSelector(state),
  };
}

export default connect(mapStateToProps)(OrderBook);
