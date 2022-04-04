import React from "react";
import { connect } from "react-redux";
import {
  myFilledOrdersLoadedSelector,
  myFilledOrdersSelector,
  myOpenOrdersLoadedSelector,
  myOpenOrdersSelector,
} from "../../store/selectors";

const Transaction = (props) => {
  console.log(props.myFilledOrders);
  console.log(props.myOpenOrders);
  const renderMyFilledOrders = (fillOrder) => {
    return fillOrder.map((orders, index) => (
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

  const renderMyOpenOrders = (fillOrder) => {
    return fillOrder.map((orders, index) => (
      <tr
        key={index}
        class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-[#20232C] even:dark:bg-[#1A1D26]"
      >
        <td class="px-2 py-4">{orders.tokenPrice}</td>
        <td
          class={
            orders.orderTypeClass === "success"
              ? "px-2 py-4 text-green-500"
              : " px-2 py-4 text-red-500"
          }
        >
          {orders.tokenAmount}
        </td>
        <td class="px-2 py-4">X</td>
      </tr>
    ));
  };
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <div className="bg-[#20232C] p-4 lg:col-span-3 rounded-md text-white">
      <p className="text-lg">My Transaction </p>
      <div className="flex flex-row justify-end mb-5  items-center space-x-8 cursor-pointer">
        <div
          onClick={() => {
            setOpenTab(1);
          }}
          className={
            openTab === 1
              ? `class="inline-block p-0 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500`
              : ""
          }
        >
          Trade
        </div>
        <div
          onClick={() => {
            setOpenTab(2);
          }}
          className={
            openTab === 2
              ? `class="inline-block p-0 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500`
              : ""
          }
        >
          Order
        </div>
      </div>
      {openTab === 1 ? (
        <div>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
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
                {props.showMyFilledOrders
                  ? renderMyFilledOrders(props.myFilledOrders)
                  : "Loading"}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        ""
      )}
      {openTab === 2 ? (
        <div>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#1A1D26] dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-4 py-3"></th>
                  <th scope="col" class="px-4 py-3">
                    DDAP
                  </th>
                  <th scope="col" class="px-4 py-3">
                    DDAP/ETH
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.showMyOpenOrders
                  ? renderMyOpenOrders(props.myOpenOrders)
                  : "Loading"}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    myFilledOrders: myFilledOrdersSelector(state),
    showMyFilledOrders: myFilledOrdersLoadedSelector(state),
    myOpenOrders: myOpenOrdersSelector(state),
    showMyOpenOrders: myOpenOrdersLoadedSelector(state),
  };
}

export default connect(mapStateToProps)(Transaction);
