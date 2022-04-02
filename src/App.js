import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Layout from "./components/Layout";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main/Main";
import { tokenAddress, exchangeAddress } from "./config";
import Token from "./artifacts/contracts/Token.sol/Token.json";
import Exchange from "./artifacts/contracts/Exchange.sol/Exchange.json";

export default function App() {
  const [exchange, setExchange] = useState("");
  const [token, setToken] = useState("");
  const [account, setAccount] = useState("");
  useEffect(() => {
    loadBlockchain();
  }, []);

  const loadBlockchain = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const exchangeContract = new ethers.Contract(
      exchangeAddress,
      Exchange.abi,
      provider
    );
    const tokenContract = new ethers.Contract(
      tokenAddress,
      Token.abi,
      provider
    );
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setAccount(address);
    setExchange(exchangeContract);
    setToken(tokenContract);
    console.log(exchangeContract);
    console.log(tokenContract);
  };
  return (
    <Layout>
      <Sidebar />
      <Main />
    </Layout>
  );
}
