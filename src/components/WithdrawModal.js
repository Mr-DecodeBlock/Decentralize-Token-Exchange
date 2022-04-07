import React from "react";
import { connect } from "react-redux";
import {
  etherWithdrawAmountChanged,
  tokenWithdrawAmountChanged,
} from "../store/actions";
import { withdrawEther, withdrawToken } from "../store/interactions";
import {
  accountSelector,
  etherWithdrawAmountSelector,
  exchangeSelector,
  tokenSelector,
  tokenWithdrawAmountSelector,
  web3Selector,
} from "../store/selectors";

const WithdrawModal = (props) => {
  const [openTab, setOpenTab] = React.useState(1);
  const {
    dispatch,
    exchange,
    web3,
    etherWithdrawAmount,
    account,
    token,
    tokenWithdrawAmount,
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
          ETH
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
          DDAP
        </div>
      </div>
      {openTab === 1 ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            withdrawEther(
              dispatch,
              exchange,
              web3,
              etherWithdrawAmount,
              account
            );
          }}
        >
          <div class="mb-6">
            <input
              type="number"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ETH Amount"
              onChange={(e) => {
                dispatch(etherWithdrawAmountChanged(e.target.value));
              }}
              required=""
            />
          </div>

          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Withdraw Ether
          </button>
        </form>
      ) : (
        ""
      )}
      {openTab === 2 ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            withdrawToken(
              dispatch,
              exchange,
              web3,
              token,
              tokenWithdrawAmount,
              account
            );
          }}
        >
          <div class="mb-6">
            <input
              type="number"
              onChange={(e) => {
                dispatch(tokenWithdrawAmountChanged(e.target.value));
              }}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="DDAP Amount"
            />
          </div>

          <button
            type="submit"
            class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Withdraw Token
          </button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    etherWithdrawAmount: etherWithdrawAmountSelector(state),
    tokenWithdrawAmount: tokenWithdrawAmountSelector(state),
    account: accountSelector(state),
    exchange: exchangeSelector(state),
    web3: web3Selector(state),
    token: tokenSelector(state),
  };
}

export default connect(mapStateToProps)(WithdrawModal);
