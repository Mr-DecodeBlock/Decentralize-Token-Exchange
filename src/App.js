import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Layout from "./components/Layout";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main/Main";
import { tokenAddress, exchangeAddress } from "./config";
import Token from "./artifacts/contracts/Token.sol/Token.json";
import Exchange from "./artifacts/contracts/Exchange.sol/Exchange.json";
import { loadAccount, loadExchange, loadWeb3 } from "./store/interactions";
import { connect } from "react-redux";

const App = (props) => {
  const [exchange, setExchange] = useState("");
  const [token, setToken] = useState("");
  const [account, setAccount] = useState("");
  useEffect(() => {
    loadBlockchain(props.dispatch);
  }, []);

  const loadBlockchain = async (dispatch) => {
    const provider = await loadWeb3(dispatch);
    const address = await loadAccount(provider, dispatch);
    const tokenContract = await loadExchange(tokenAddress, Token.abi, provider);
    const exchangeContract = await loadExchange(
      exchangeAddress,
      Exchange.abi,
      provider
    );
    console.log(provider);
    console.log(address);
    console.log(tokenContract);
    console.log(exchangeAddress);
    // const provider = new ethers.providers.JsonRpcProvider();
    // const exchangeContract = new ethers.Contract(
    //   exchangeAddress,
    //   Exchange.abi,
    //   provider
    // );
    // const tokenContract = new ethers.Contract(
    //   tokenAddress,
    //   Token.abi,
    //   provider
    // );
    // const signer = provider.getSigner();
    // const address = await signer.getAddress();
    // setAccount(address);
    // setExchange(exchangeContract);
    // setToken(tokenContract);
  };
  return (
    <Layout>
      <Sidebar />
      <Main />
    </Layout>
  );
};

function mapStateToProps(state) {
  return {
    // contractsLoaded: contractsLoadedSelector(state)
  };
}

export default connect(mapStateToProps)(App);
