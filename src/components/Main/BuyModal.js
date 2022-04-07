import React from "react";
import { connect } from "react-redux";

import {
  exchangeSelector,
  tokenSelector,
  accountSelector,
  web3Selector,
  buyOrderSelector,
  sellOrderSelector,
} from "../../store/selectors";
import {
  buyOrderAmountChanged,
  buyOrderPriceChanged,
  sellOrderAmountChanged,
  sellOrderPriceChanged,
} from "../../store/actions";
import { makeBuyOrder, makeSellOrder } from "../../store/interactions";
const BuyModal = (props) => {
  const [openTab, setOpenTab] = React.useState(1);

  const { dispatch, buyOrder, exchange, token, web3, account, sellOrder } =
    props;
  return (
    <div className="text-white flex flex-col">
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
          BUY
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
          SELL
        </div>
      </div>
      {openTab === 1 ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            makeBuyOrder(dispatch, exchange, token, web3, buyOrder, account);
          }}
        >
          <div class="mb-6">
            <input
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Buy Amount(DDAP)"
              onChange={(e) => dispatch(buyOrderAmountChanged(e.target.value))}
            />
          </div>
          <div class="mb-6">
            <input
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Buy price"
              onChange={(e) => dispatch(buyOrderPriceChanged(e.target.value))}
            />
          </div>

          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Buy Order
          </button>
        </form>
      ) : (
        ""
      )}
      {openTab === 2 ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            makeSellOrder(dispatch, exchange, token, web3, sellOrder, account);
          }}
        >
          <div class="mb-6">
            <input
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Buy Amount(DDAP)"
              onChange={(e) => dispatch(sellOrderAmountChanged(e.target.value))}
            />
          </div>
          <div class="mb-6">
            <input
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Buy price"
              onChange={(e) => dispatch(sellOrderPriceChanged(e.target.value))}
            />
          </div>

          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sell Order
          </button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

function mapStateToProps(state) {
  const buyOrder = buyOrderSelector(state);
  const sellOrder = sellOrderSelector(state);

  return {
    account: accountSelector(state),
    exchange: exchangeSelector(state),
    token: tokenSelector(state),
    web3: web3Selector(state),
    buyOrder,
    sellOrder,
    showForm: !buyOrder.making && !sellOrder.making,
    showBuyTotal: buyOrder.amount && buyOrder.price,
    showSellTotal: sellOrder.amount && sellOrder.price,
  };
}

export default connect(mapStateToProps)(BuyModal);
