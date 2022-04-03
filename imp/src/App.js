import React, { useEffect, useState } from "react";
import Web3Modal from "web3modal";

import Layout from "./components/Layout";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main/Main";
import { tokenAddress, exchangeAddress } from "./config";
import Token from "./artifacts/contracts/Token.sol/Token.json";
import Exchange from "./artifacts/contracts/Exchange.sol/Exchange.json";
import {
  loadAccount,
  loadExchange,
  loadToken,
  loadWeb3,
} from "./store/interactions";
import { connect } from "react-redux";
import { contractsLoadedSelector } from "./store/selectors";
import Modal from "./components/Modal";
import "./polyfill";
const App = (props) => {
  useEffect(() => {
    // loadBlockchain(props.dispatch);
  }, []);

  // const _loadBlockchain = async (dispatch) => {
  //   // let provider = await loadWeb3(dispatch);
  //   const web3Modal = new Web3Modal();
  //   const connection = await web3Modal.connect();
  //   const provider = new ethers.providers.Web3Provider(connection);

  //   // setAddress(userAddress);
  //   const address = await loadAccount(provider, dispatch);
  //   const tokenContract = await loadToken(
  //     tokenAddress,
  //     Token.abi,
  //     provider,
  //     dispatch
  //   );

  //   setTokenContract(tokenContract);

  //   const exchangeContract = await loadExchange(
  //     exchangeAddress,
  //     Exchange.abi,
  //     provider,
  //     dispatch
  //   );
  // };

  const loadBlockchain = async (dispatch) => {
    const web3 = await loadWeb3(dispatch);
    const networkId = await web3.eth.net.getId();
    await loadAccount(web3, dispatch);
    const token = await loadToken(web3, networkId, dispatch);
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
  };
}

export default connect(mapStateToProps)(App);
