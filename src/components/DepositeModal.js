import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { connect } from "react-redux";
import { etherDepositAmountChanged } from "../store/actions";
import {
  etherDepositAmountSelector,
  accountSelector,
  exchangeSelector,
  tokenSelector,
  web3Selector,
} from "../store/selectors";
import { depositEther } from "../store/interactions";

const DepositeModal = (props) => {
  const { dispatch, exchange, web3, etherDepositeAmount, account } = props;
  return (
    <div className="text-white flex flex-col">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          depositEther(dispatch, exchange, web3, etherDepositeAmount, account);
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
            type="password"
            id="password"
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
    account: accountSelector(state),
    exchange: exchangeSelector(state),
    web3: web3Selector(state),
    token: tokenSelector(state),
  };
}

export default connect(mapStateToProps)(DepositeModal);
