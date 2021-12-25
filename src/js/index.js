import '../styles/styles.css'

import Web3 from "web3/dist/web3.min";
import { ChainId } from "@uniswap/sdk";

const serverUrl = "https://aenwdi8fge3h.usemoralis.com:2053/server"; //Server url from moralis.io
const appId = "4I2LYb4bc9PnEC8iWPBoVxAlUxhI45KTwWxVRXyM"; 


window.onload = async () => {
    // Init Web3 connected to ETH network
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      const chainId = await window.web3.eth.getChainId()
      console.log(chainId)

      if (chainId != 56) {
        document.getElementById("navbar-error-text").hidden = false;
          alert("Wrong network!");
      } else {
        document.getElementById("swap_button").disabled = false;
      }
    } else {
      alert("No ETH brower extension detected.");
    }
    // Load in Localstore key
    window.userAddress = window.localStorage.getItem("userAddress");
    console.log(window.userAddress)
    // showAddress();
  };

// Login with Web3 via Metamasks window.ethereum library
async function loginWithEth() {
if (window.web3) {
    try {
    // We use this since ethereum.enable() is deprecated. This method is not
    // available in Web3JS - so we call it directly from metamasks' library
    const selectedAccount = await window.ethereum
        .request({
        method: "eth_requestAccounts",
        })
        .then((accounts) => accounts[0])
        .catch(() => {
            throw Error("No account selected!");
        });
        document.getElementById("swap_button").disabled = false;
        console.log(window.web3.eth.ChainId)
    window.userAddress = selectedAccount;
    window.localStorage.setItem("userAddress", selectedAccount);
    console.log(selectedAccount)
    // showAddress();
    } catch (error) {
        console.error(error);
    }
} else {
    alert("No ETH brower extension detected.");
}
}

function logout() {
    window.userAddress = null;
    window.localStorage.removeItem("userAddress");
    showAddress();
  }

document.getElementById("login_button").onclick = loginWithEth;