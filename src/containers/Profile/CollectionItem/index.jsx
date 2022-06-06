/* eslint-disable no-unused-vars */

import PartProfile from "../../../components/PartProfile"
import CreateItemProfileheader from "../../../assets/img/bg-img/mint-bg.jpg"
import CreateItemAuthors2 from "../../../assets/img/blog-img/logo.png"
import CreateItemDataIcon from '../../../data/data-containers/data-CollectionItem-Profile.json'
import { useEffect, useState } from "react"
import Web3 from "web3"
import React from 'react'
import { useSelector } from "react-redux";

const CollectionItem = () => {

  const account = useSelector((state) => state.cart.account)
  const web = useSelector((state) => state.cart.web3)
  const [accountBalance, setAccountBalance] = useState(0);
  const [tokenContract, setTokenContract] = useState(null)
  const [tokenBalance, setTokenBalnce] = useState("0");

  useEffect(() => {
    const LoadContracts = async () => {
      const netWorkId = await web.eth.net.getId();
      //Get Token Contract
      const TokenContractFile = await fetch("/abis/Token.json");
      const convertTokenContractFileToJson = await TokenContractFile.json();
      const tokenAbi = await convertTokenContractFileToJson.abi;

      const TokenMarketWorkObject = convertTokenContractFileToJson.networks[netWorkId];

      if (TokenMarketWorkObject) {

        const tokenAddress = TokenMarketWorkObject.address;
        const deployedTokenContract = await new web.eth.Contract(tokenAbi, tokenAddress);
        setTokenContract(deployedTokenContract);
        console.log("account from index", account);
        if (account) {
          const myBalance = await web.eth.getBalance(account)
          const convertBalance = await web.utils.fromWei(myBalance, "ether")
          setAccountBalance(convertBalance)
          const getTokenBalance = await deployedTokenContract.methods.balanceOf(account).call();
          const tokenPriceToWei = Web3.utils.fromWei(getTokenBalance, "ether")
          setTokenBalnce(tokenPriceToWei.toString());
        }
      }
    }
    web && account && LoadContracts()

  }, [web, account])
  return (
      <PartProfile
        img1={CreateItemProfileheader}
        img2={CreateItemAuthors2}
        address={account}
        croBalnce={accountBalance}
        isoBalnce={tokenBalance}
        data={CreateItemDataIcon}
      />
  );
}

export default CollectionItem;