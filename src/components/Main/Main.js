import React from "react";
import Actions from "./Actions";
import MarketSummary from "./MarketSummary";
import OrderBook from "./OrderBook";
import Trades from "./Trades";
import Transaction from "./Transaction";

const Main = () => {
  return (
    <main className=" w-full lg:w-9/12 p-4">
      <Actions />
      <div class="grid lg:grid-cols-3 gap-4 grid-cols-1 lg:gap-4">
        <MarketSummary />
        <OrderBook />
        <Transaction />
        <Trades />
      </div>
    </main>
  );
};

export default Main;
