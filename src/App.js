import React, { useEffect, useState } from "react";
import { ethers, providers } from "ethers";
import Web3Modal from "web3modal";

import Layout from "./components/Layout";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main/Main";
import { tokenAddress, exchangeAddress } from "./config";
import Token from "./artifacts/contracts/Token.sol/Token.json";
import Exchange from "./artifacts/contracts/Exchange.sol/Exchange.json";
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
import Modal from "./components/Modal";

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
    if (!exchange) {
      window.alert(
        "Exchange smart contract not detected on the current network. Please select another network with Metamask."
      );
      return;
    }
    // await subscribeToEvents(exchange, dispatch);
    await loadAllOrders(exchange, dispatch);
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
      <Layout>
        <p>Loading</p>
      </Layout>
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
