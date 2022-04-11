import Web3 from "web3";
import {
  web3Loaded,
  web3AccountLoaded,
  tokenLoaded,
  exchangeLoaded,
  cancelledOrdersLoaded,
  filledOrdersLoaded,
  allOrdersLoaded,
  orderCancelling,
  orderCancelled,
  orderFilling,
  orderFilled,
  etherBalanceLoaded,
  tokenBalanceLoaded,
  exchangeEtherBalanceLoaded,
  exchangeTokenBalanceLoaded,
  balancesLoaded,
  balancesLoading,
  buyOrderMaking,
  sellOrderMaking,
  orderMade,
} from "./actions";
import Token from "../artifacts/contracts/Token.sol/Token.json";
import Exchange from "../artifacts/contracts/Exchange.sol/Exchange.json";
import { ETHER_ADDRESS } from "../helpers";

export const loadWeb3 = async (dispatch) => {
  if (typeof window.ethereum !== "undefined") {
    const web3 = new Web3(window.ethereum);

    // const web3 = new Web3('https://rpc-mumbai.maticvigil.com');
    dispatch(web3Loaded(web3));
    return web3;
  } else {
    window.alert("Please install MetaMask");
    window.location.assign("https://metamask.io/");
  }
};

export const loadAccount = async (web3, dispatch) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  console.log(account);
  dispatch(web3AccountLoaded(account));
  return account;
};

export const loadToken = async (web3, networkId, dispatch) => {
  try {
    // console.log(web3, networkId, dispatch);
    const token = new web3.eth.Contract(
      Token.abi,
      // "0x5FbDB2315678afecb367f032d93F642f64180aa3"
      // "0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1"
      // "0xb2e6A57C84132c1F76cC3FBabfA10F7Dde520024"
      // "0x95e8B230edaaa904395ea208C00dF8fB54d9365f"
      // "0xB5c5Ce22c590d0c339e37B2bd2813Ee456E8dD9A"
      // "0xEa01e0Ce81F520ddd89C1558f9120AF17a7E7Fc8"
      "0x69e3a2EcD595B63eA59738DF880f76b1A9Bc2808"
      // Token.networks[networkId].address
    );
    // console.log();
    console.log(token);
    dispatch(tokenLoaded(token));
    return token;
  } catch (error) {
    // console.log(error);
    console.log(
      "Contract not deployed to the current network. Please select another network with Metamask."
    );
    return null;
  }
};

export const loadExchange = async (web3, networkId, dispatch) => {
  try {
    const exchange = new web3.eth.Contract(
      Exchange.abi,
      // "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
      // "0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44"
      // "0xd9fce126aa70358E7471174b311Bc71AB21F7F7e"
      // "0x261508E46Dad452FfD5eaAd674Da080125aC817C"
      // "0x1Fe617be55380C4e4687B0b07Dbb08c58125035B"
      // "0x45C78c722D06E9a8FB1ff169671eb0968da9e85b"
      "0xFC3EeB6e8CA2690594D2f34f3A1184c0e152989E"
    );
    console.log(exchange);
    dispatch(exchangeLoaded(exchange));
    return exchange;
  } catch (error) {
    console.log(
      "Contract not deployed to the current network. Please select another network with Metamask."
    );
    return null;
  }
};

export const loadAllOrders = async (exchange, dispatch) => {
  // Fetch cancelled orders with the "Cancel" event stream
  // console.log(web3.eth.getBlockNumbe)
  const cancelStream = await exchange.getPastEvents("Cancel", {
    fromBlock: 0,
    toBlock: "latest",
    // toBlock: 20,
    // topBlock: -50,
  });
  // Format cancelled orders
  const cancelledOrders = cancelStream.map((event) => event.returnValues);
  // Add cancelled orders to the redux store
  dispatch(cancelledOrdersLoaded(cancelledOrders));

  // Fetch filled orders with the "Trade" event stream
  const tradeStream = await exchange.getPastEvents("Trade", {
    fromBlock: 0,
    toBlock: "latest",
    // toBlock: 20,
    // topBlock: -50,
  });
  // Format filled orders
  const filledOrders = tradeStream.map((event) => event.returnValues);
  // Add cancelled orders to the redux store
  dispatch(filledOrdersLoaded(filledOrders));

  // Load order stream
  const orderStream = await exchange.getPastEvents("Order", {
    fromBlock: 0,
    toBlock: "latest",
    // toBlock: 20,
    // topBlock: -50,
  });
  // Format order stream
  const allOrders = orderStream.map((event) => event.returnValues);
  // Add open orders to the redux store
  console.log(allOrders);
  dispatch(allOrdersLoaded(allOrders));
};

export const subscribeToEvents = async (exchange, dispatch) => {
  exchange.events.Cancel({}, (error, event) => {
    dispatch(orderCancelled(event.returnValues));
  });

  exchange.events.Trade({}, (error, event) => {
    dispatch(orderFilled(event.returnValues));
  });

  exchange.events.Deposite({}, (error, event) => {
    dispatch(balancesLoaded());
  });

  exchange.events.Withdraw({}, (error, event) => {
    dispatch(balancesLoaded());
  });

  exchange.events.Order({}, (error, event) => {
    dispatch(orderMade(event.returnValues));
  });
};

export const cancelOrder = (dispatch, exchange, order, account) => {
  exchange.methods
    .cancelOrder(order.id)
    .send({ from: account })
    .on("transactionHash", (hash) => {
      dispatch(orderCancelling());
    })
    .on("error", (error) => {
      console.log(error);
      window.alert("There was an error!");
    });
};

export const fillOrder = (dispatch, exchange, order, account) => {
  exchange.methods
    .fillOrder(order.id)
    .send({ from: account })
    .on("transactionHash", (hash) => {
      dispatch(orderFilling());
    })
    .on("error", (error) => {
      console.log(error);
      window.alert("There was an error!");
    });
};

export const loadBalances = async (
  dispatch,
  web3,
  exchange,
  token,
  account
) => {
  if (typeof account !== "undefined") {
    // Ether balance in wallet
    const etherBalance = await web3.eth.getBalance(account);
    dispatch(etherBalanceLoaded(etherBalance));

    // Token balance in wallet
    const tokenBalance = await token.methods.balanceOf(account).call();
    dispatch(tokenBalanceLoaded(tokenBalance));

    // Ether balance in exchange
    const exchangeEtherBalance = await exchange.methods
      .balanceOf(ETHER_ADDRESS, account)
      .call();
    dispatch(exchangeEtherBalanceLoaded(exchangeEtherBalance));

    // Token balance in exchange
    const exchangeTokenBalance = await exchange.methods
      .balanceOf(token.options.address, account)
      .call();
    dispatch(exchangeTokenBalanceLoaded(exchangeTokenBalance));

    // Trigger all balances loaded
    dispatch(balancesLoaded());
  } else {
    window.alert("Please login with MetaMask");
  }
};

export const depositEther = (dispatch, exchange, web3, amount, account) => {
  console.log(amount, account);
  exchange.methods
    .depositeEther(ETHER_ADDRESS)
    .send({ from: account, value: web3.utils.toWei(amount, "ether") })
    .on("transactionHash", (hash) => {
      dispatch(balancesLoading());
    })
    .on("error", (error) => {
      console.error(error);
      window.alert(`There was an error!`);
    });
};

export const withdrawEther = (dispatch, exchange, web3, amount, account) => {
  exchange.methods
    .withdrawEther(web3.utils.toWei(amount, "ether"), ETHER_ADDRESS)
    .send({ from: account })
    .on("transactionHash", (hash) => {
      dispatch(balancesLoading());
    })
    .on("error", (error) => {
      console.error(error);
      window.alert(`There was an error!`);
    });
};

export const depositToken = (
  dispatch,
  exchange,
  web3,
  token,
  amount,
  account
) => {
  amount = web3.utils.toWei(amount, "ether");
  // amount = amount.toString();
  console.log(amount);
  token.methods
    .approve(exchange.options.address, amount)
    .send({ from: account })
    .on("transactionHash", (hash) => {
      console.log(hash);
      exchange.methods
        .depositeToken(token.options.address, amount)
        .send({ from: account })
        .on("transactionHash", (hash) => {
          dispatch(balancesLoading());
        })
        .on("error", (error) => {
          console.error(error);
          window.alert(`There was an error!`);
        });
    });
};

export const withdrawToken = (
  dispatch,
  exchange,
  web3,
  token,
  amount,
  account
) => {
  exchange.methods
    .withdrawTokens(token.options.address, web3.utils.toWei(amount, "ether"))
    .send({ from: account })
    .on("transactionHash", (hash) => {
      dispatch(balancesLoading());
    })
    .on("error", (error) => {
      console.error(error);
      window.alert(`There was an error!`);
    });
};

export const makeBuyOrder = (
  dispatch,
  exchange,
  token,
  web3,
  order,
  account
) => {
  const tokenGet = token.options.address;
  const amountGet = web3.utils.toWei(order.amount, "ether");
  const tokenGive = ETHER_ADDRESS;
  const amountGive = web3.utils.toWei(
    (order.amount * order.price).toString(),
    "ether"
  );

  exchange.methods
    .makeOrder(tokenGet, amountGet, tokenGive, amountGive)
    .send({ from: account })
    .on("transactionHash", (hash) => {
      dispatch(buyOrderMaking());
    })
    .on("error", (error) => {
      console.error(error);
      window.alert(`There was an error!`);
    });
};

export const makeSellOrder = (
  dispatch,
  exchange,
  token,
  web3,
  order,
  account
) => {
  const tokenGet = ETHER_ADDRESS;
  const amountGet = web3.utils.toWei(
    (order.amount * order.price).toString(),
    "ether"
  );
  const tokenGive = token.options.address;
  const amountGive = web3.utils.toWei(order.amount, "ether");

  exchange.methods
    .makeOrder(tokenGet, amountGet, tokenGive, amountGive)
    .send({ from: account })
    .on("transactionHash", (hash) => {
      dispatch(sellOrderMaking());
    })
    .on("error", (error) => {
      console.error(error);
      window.alert(`There was an error!`);
    });
};
