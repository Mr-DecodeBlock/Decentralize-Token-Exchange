import React, { useEffect } from "react";
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

const App = (props) => {
  useEffect(() => {
    loadBlockchain(props.dispatch);
  }, []);

  const loadBlockchain = async (dispatch) => {
    const provider = await loadWeb3(dispatch);
    const address = await loadAccount(provider, dispatch);
    const tokenContract = await loadToken(
      tokenAddress,
      Token.abi,
      provider,
      dispatch
    );
    const exchangeContract = await loadExchange(
      exchangeAddress,
      Exchange.abi,
      provider,
      dispatch
    );
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
