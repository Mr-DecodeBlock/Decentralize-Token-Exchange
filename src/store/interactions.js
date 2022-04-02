import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Token from "../artifacts/contracts/Token.sol/Token.json";
import Exchange from "../artifacts/contracts/Exchange.sol/Exchange.json";

import {
  web3Loaded,
  web3AccountLoaded,
  tokenLoaded,
  exchangeLoaded,
  cancelledOrdersLoaded,
  filledOrdersLoaded,
  allOrdersLoaded,
  //   orderCancelling,
  //   orderCancelled,
  //   orderFilling,
  //   orderFilled,
  //   etherBalanceLoaded,
  //   tokenBalanceLoaded,
  //   exchangeEtherBalanceLoaded,
  //   exchangeTokenBalanceLoaded,
  //   balancesLoaded,
  //   balancesLoading,
  //   buyOrderMaking,
  //   sellOrderMaking,
  //   orderMade
} from "./actions";

export const loadWeb3 = async (dispatch) => {
  if (typeof window.ethereum !== "undefined") {
    const web3 = new ethers.providers.JsonRpcProvider();

    dispatch(web3Loaded(web3));
    return web3;
  } else {
    window.alert("Please install MetaMask");
    window.location.assign("https://metamask.io/");
  }
};

export const loadAccount = async (provider, dispatch) => {
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  dispatch(web3AccountLoaded(address));
  return address;
};

export const loadToken = async (tokenAddress, tokenabi, provider, dispatch) => {
  try {
    const token = new ethers.Contract(tokenAddress, tokenabi, provider);
    console.log(token);

    dispatch(tokenLoaded(token));
    return token;
  } catch (error) {
    console.log(error);
    console.log(
      "Contract not deployed to the current network. Please select another network with Metamask."
    );
    return null;
  }
};

export const loadExchange = async (
  exchangeAddress,
  exchangeabi,
  provider,
  dispatch
) => {
  try {
    const exchange = new ethers.Contract(
      exchangeAddress,
      exchangeabi,
      provider
    );
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
  // A filter for when a specific address receives tokens
  //   let eventFilter = exchange.filters.Cancel();
  //   let events = await exchange.queryFilter(eventFilter);

  let events = await exchange.queryFilter(exchange.filters.Cancel());
  console.log(events);
  // Receive an event when that filter occurs
  //   exchange.on(filter, (from, to, amount, event) => {
  //     console.log(`to: ${to}`);
  //   });

  // Fetch cancelled orders with the "Cancel" event stream
  //   const cancelStream = await exchange.getPastEvents("Cancel", {
  //     fromBlock: 0,
  //     toBlock: "latest",
  //   });
  //   // Format cancelled orders
  //   const cancelledOrders = cancelStream.map((event) => event.returnValues);
  //   // Add cancelled orders to the redux store
  //   dispatch(cancelledOrdersLoaded(cancelledOrders));

  //   // Fetch filled orders with the "Trade" event stream
  //   const tradeStream = await exchange.getPastEvents("Trade", {
  //     fromBlock: 0,
  //     toBlock: "latest",
  //   });
  //   // Format filled orders
  //   const filledOrders = tradeStream.map((event) => event.returnValues);
  //   // Add cancelled orders to the redux store
  //   dispatch(filledOrdersLoaded(filledOrders));

  //   // Load order stream
  //   const orderStream = await exchange.getPastEvents("Order", {
  //     fromBlock: 0,
  //     toBlock: "latest",
  //   });
  //   // Format order stream
  //   const allOrders = orderStream.map((event) => event.returnValues);
  //   // Add open orders to the redux store
  //   dispatch(allOrdersLoaded(allOrders));
};

// export const subscribeToEvents = async (exchange, dispatch) => {
//   exchange.events.Cancel({}, (error, event) => {
//     dispatch(orderCancelled(event.returnValues))
//   })

//   exchange.events.Trade({}, (error, event) => {
//     dispatch(orderFilled(event.returnValues))
//   })

//   exchange.events.Deposit({}, (error, event) => {
//     dispatch(balancesLoaded())
//   })

//   exchange.events.Withdraw({}, (error, event) => {
//     dispatch(balancesLoaded())
//   })

//   exchange.events.Order({}, (error, event) => {
//     dispatch(orderMade(event.returnValues))
//   })
// }

// export const cancelOrder = (dispatch, exchange, order, account) => {
//   exchange.methods.cancelOrder(order.id).send({ from: account })
//   .on('transactionHash', (hash) => {
//      dispatch(orderCancelling())
//   })
//   .on('error', (error) => {
//     console.log(error)
//     window.alert('There was an error!')
//   })
// }

// export const fillOrder = (dispatch, exchange, order, account) => {
//   exchange.methods.fillOrder(order.id).send({ from: account })
//   .on('transactionHash', (hash) => {
//      dispatch(orderFilling())
//   })
//   .on('error', (error) => {
//     console.log(error)
//     window.alert('There was an error!')
//   })
// }

// export const loadBalances = async (dispatch, web3, exchange, token, account) => {
//   if(typeof account !== 'undefined') {
//       // Ether balance in wallet
//       const etherBalance = await web3.eth.getBalance(account)
//       dispatch(etherBalanceLoaded(etherBalance))

//       // Token balance in wallet
//       const tokenBalance = await token.methods.balanceOf(account).call()
//       dispatch(tokenBalanceLoaded(tokenBalance))

//       // Ether balance in exchange
//       const exchangeEtherBalance = await exchange.methods.balanceOf(ETHER_ADDRESS, account).call()
//       dispatch(exchangeEtherBalanceLoaded(exchangeEtherBalance))

//       // Token balance in exchange
//       const exchangeTokenBalance = await exchange.methods.balanceOf(token.options.address, account).call()
//       dispatch(exchangeTokenBalanceLoaded(exchangeTokenBalance))

//       // Trigger all balances loaded
//       dispatch(balancesLoaded())
//     } else {
//       window.alert('Please login with MetaMask')
//     }
// }

// export const depositEther = (dispatch, exchange, web3, amount, account) => {
//   exchange.methods.depositEther().send({ from: account,  value: web3.utils.toWei(amount, 'ether') })
//   .on('transactionHash', (hash) => {
//     dispatch(balancesLoading())
//   })
//   .on('error',(error) => {
//     console.error(error)
//     window.alert(`There was an error!`)
//   })
// }

// export const withdrawEther = (dispatch, exchange, web3, amount, account) => {
//   exchange.methods.withdrawEther(web3.utils.toWei(amount, 'ether')).send({ from: account })
//   .on('transactionHash', (hash) => {
//     dispatch(balancesLoading())
//   })
//   .on('error',(error) => {
//     console.error(error)
//     window.alert(`There was an error!`)
//   })
// }

// export const depositToken = (dispatch, exchange, web3, token, amount, account) => {
//   amount = web3.utils.toWei(amount, 'ether')

//   token.methods.approve(exchange.options.address, amount).send({ from: account })
//   .on('transactionHash', (hash) => {
//     exchange.methods.depositToken(token.options.address, amount).send({ from: account })
//     .on('transactionHash', (hash) => {
//       dispatch(balancesLoading())
//     })
//     .on('error',(error) => {
//       console.error(error)
//       window.alert(`There was an error!`)
//     })
//   })
// }

// export const withdrawToken = (dispatch, exchange, web3, token, amount, account) => {
//   exchange.methods.withdrawToken(token.options.address, web3.utils.toWei(amount, 'ether')).send({ from: account })
//   .on('transactionHash', (hash) => {
//     dispatch(balancesLoading())
//   })
//   .on('error',(error) => {
//     console.error(error)
//     window.alert(`There was an error!`)
//   })
// }

// export const makeBuyOrder = (dispatch, exchange, token, web3, order, account) => {
//   const tokenGet = token.options.address
//   const amountGet = web3.utils.toWei(order.amount, 'ether')
//   const tokenGive = ETHER_ADDRESS
//   const amountGive = web3.utils.toWei((order.amount * order.price).toString(), 'ether')

//   exchange.methods.makeOrder(tokenGet, amountGet, tokenGive, amountGive).send({ from: account })
//   .on('transactionHash', (hash) => {
//     dispatch(buyOrderMaking())
//   })
//   .on('error',(error) => {
//     console.error(error)
//     window.alert(`There was an error!`)
//   })
// }

// export const makeSellOrder = (dispatch, exchange, token, web3, order, account) => {
//   const tokenGet = ETHER_ADDRESS
//   const amountGet = web3.utils.toWei((order.amount * order.price).toString(), 'ether')
//   const tokenGive = token.options.address
//   const amountGive = web3.utils.toWei(order.amount, 'ether')

//   exchange.methods.makeOrder(tokenGet, amountGet, tokenGive, amountGive).send({ from: account })
//   .on('transactionHash', (hash) => {
//     dispatch(sellOrderMaking())
//   })
//   .on('error',(error) => {
//     console.error(error)
//     window.alert(`There was an error!`)
//   })
// }
