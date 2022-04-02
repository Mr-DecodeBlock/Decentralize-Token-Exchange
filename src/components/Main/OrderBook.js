import React, { useEffect } from "react";
import { ethers, providers } from "ethers";
import Web3Modal from "web3modal";
import { connect } from "react-redux";
import { loadAllOrders } from "../../store/interactions";
import { exchangeSelector } from "../../store/selectors";

const OrderBook = (props) => {
  useEffect(() => {
    loadBlockchain(props.dispatch);
  }, []);
  const loadBlockchain = async (dispatch) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    await loadAllOrders(props.exchange, dispatch, provider);
  };

  return (
    <div className="bg-[#20232C] p-4 rounded-md text-white">
      <p className="text-lg mb-5">Order Book</p>
      <div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#1A1D26] dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3"></th>
                <th scope="col" class="px-6 py-3">
                  DDAP
                </th>
                <th scope="col" class="px-6 py-3">
                  DDAP/ETH
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-[#20232C] even:dark:bg-[#1A1D26]">
                <td class="px-6 py-4">9:00am</td>
                <td class="px-6 py-4">20</td>
                <td class="px-6 py-4">0.01</td>
              </tr>
              <tr class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-[#20232C] even:dark:bg-[#1A1D26]">
                <td class="px-6 py-4">9:00am</td>
                <td class="px-6 py-4">20</td>
                <td class="px-6 py-4">0.01</td>
              </tr>
              <tr class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-[#20232C] even:dark:bg-[#1A1D26]">
                <td class="px-6 py-4">9:00am</td>
                <td class="px-6 py-4">20</td>
                <td class="px-6 py-4">0.01</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    exchange: exchangeSelector(state),
  };
}

export default connect(mapStateToProps)(OrderBook);
