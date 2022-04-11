import React, { useEffect } from "react";

import Layout from "./components/Layout";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main/Main";

import {
  loadAccount,
  loadAllOrders,
  loadExchange,
  loadToken,
  loadWeb3,
  subscribeToEvents,
} from "./store/interactions";
import { connect } from "react-redux";
import { contractsLoadedSelector, exchangeSelector } from "./store/selectors";

const App = (props) => {
  useEffect(() => {
    loadBlockchain(props.dispatch);
  }, []);

  const loadBlockchain = async (dispatch) => {
    const web3 = await loadWeb3(dispatch);
    const networkId = await web3.eth.net.getId();
    await loadAccount(web3, dispatch);

    const token = await loadToken(web3, networkId, dispatch);
    // console.log(web3);
    if (!token) {
      window.alert(
        "Token smart contract not detected on the current network. Please select another network with Metamask."
      );
      return;
    }
    const exchange = await loadExchange(web3, networkId, dispatch);
    // if (!exchange) {
    //   window.alert(
    //     "Exchange smart contract not detected on the current network. Please select another network with Metamask."
    //   );
    //   return;
    // }
    await loadAllOrders(exchange, dispatch);
    await subscribeToEvents(exchange, dispatch);
    // await subscribeToEvents(dispatch, exchange)
  };

  if (props.contractsLoaded) {
    return (
      <Layout>
        <Sidebar />
        <Main />
      </Layout>
    );
  } else {
    return (
      <div className="bg-[#1A1D26] flex flex-col items-center justify-center w-full  h-screen">
        <img
          className="w-20 h-20 animate-pulse"
          src="/images/ethereum-eth.svg"
          alt="Display"
        />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    contractsLoaded: contractsLoadedSelector(state),
    exchange: exchangeSelector(state),
  };
}

export default connect(mapStateToProps)(App);
