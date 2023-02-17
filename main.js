// We are using version 5 of the ethers library
// https://docs.ethers.io/v5/
// Version 6 has some breaking changes and finding the right documentation
// would be a bit tricky

import { ethers } from "ethers";

// import the abi of a ERC721 contract
// this is the interface of the contract
// it tells us what functions are available
// and what parameters they take
import abi from "./abi.js";

// get connection button element
const connectButton = document.getElementById("connect");

// get the address element
const addressElement = document.getElementById("address");

// get the balance element
const balanceElement = document.getElementById("balance");


// when the connect button is clicked
// connect to the wallet
connectButton.addEventListener("click", async () => {
  // check if the ethereum object is available
  if (typeof window.ethereum !== "undefined") {
    // request access to the user's ethereum account
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // get the first account from the array of accounts
    const address = accounts[0];

    // create a provider using the ethers library
    // this will allow us to interact with the ethereum blockchain
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // get the signer from the provider
    // this will allow us to sign transactions
    const signer = provider.getSigner();

    // get the balance of the account
    const balance = await provider.getBalance(address);

    // create an instance of contract to interact with it
    // first parameter is the contract address
    // second parameter is the abi of the contract
    // third parameter is the signer
    const contract = new ethers.Contract(
      "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
      abi,
      signer
    );

    // call the balanceOf function of the contract
    // read functions do not require a transaction
    // so we can call them directly
    const boredAPEbalance = await contract.balanceOf(address);

    console.log(`You own ${boredAPEbalance} Bored APE Yacht Club NFTs`);

    try {
      // for write functions we need to send a transaction
      // and then we can wait for the transaction to finish using await tx.wait()
      // the example below sends NFT with id 100 from first account to second account
      // this will fail because the first account that is your wallet address does not own the NFT
      await contract.transferFrom(
        address,
        "0x000000000000000000000000000000000000dEaD",
        100
      );
    } catch (error) {
      console.log(
        "This transaction will fail because the first account does not own the NFT"
      );
    }

    // set the address element to the account address
    addressElement.innerHTML = address;

    // set the balance element to the balance
    balanceElement.innerHTML = balance;

    // hide the connect button
    connectButton.style.display = "none";
  }
});
