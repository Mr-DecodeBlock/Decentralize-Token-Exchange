import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { connect } from "react-redux";
import {
  etherDepositAmountChanged,
  tokenDepositAmountChanged,
} from "../store/actions";
import {
  etherDepositAmountSelector,
  accountSelector,
  exchangeSelector,
  tokenSelector,
  web3Selector,
  tokenDepositAmountSelector,
} from "../store/selectors";
import { depositEther, depositToken } from "../store/interactions";

const DepositeModal = (props) => {
  const [openTab, setOpenTab] = React.useState(1);
  const [etherAmount, setEtherAmount] = useState(0);
  const {
    dispatch,
    exchange,
    web3,
    etherDepositeAmount,
    account,
    token,
    tokenDepositeAmount,
  } = props;
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          depositEther(dispatch, exchange, web3, etherDepositeAmount, account);
          // depositToken(
          //   dispatch,
          //   exchange,
          //   web3,
          //   token,
          //   tokenDepositeAmount,
          //   account
          // );
        }}
      >
        <div class="mb-6">
          <input
            type="number"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="ETH Amount"
            onChange={(e) => {
              dispatch(etherDepositAmountChanged(e.target.value));
            }}
            required=""
          />
        </div>
        <div class="mb-6">
          <input
            type="number"
            onChange={(e) => {
              dispatch(tokenDepositAmountChanged(e.target.value));
            }}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="DDAP Amount"
          />
        </div>

        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Deposite
        </button>
      </form>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    etherDepositeAmount: etherDepositAmountSelector(state),
    tokenDepositeAmount: tokenDepositAmountSelector(state),
    account: accountSelector(state),
    exchange: exchangeSelector(state),
    web3: web3Selector(state),
    token: tokenSelector(state),
  };
}

export default connect(mapStateToProps)(DepositeModal);
