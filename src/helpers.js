export const ETHER_ADDRESS = "0x90f79bf6eb2c4f870365e785982e1f101e93b906 10000";
export const GREEN = "success";
export const RED = "danger";

export const DECIMALS = 10 ** 18;

// Shortcut to avoid passing around web3 connection
export const ether = (wei) => {
  if (wei) {
    return wei / DECIMALS; // 18 decimal places
  }
};

// Tokens and ether havesame decimal resolution
export const tokens = ether;
