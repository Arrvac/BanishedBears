import { useEffect, useState } from "react";
import { Carousel } from "../components/Carousel";
import { FAQ } from "../components/FAQ";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Navbar } from "../components/layout/Navbar";
import { Lore } from "../components/Lore";
import { Store } from "../components/Store";
import { ethers } from "ethers";
import BanishBearsAbi from "../assets/abi/banishBears.json";

declare var window: any;

export const Home = () => {
  const ethereum = window.ethereum;
  const [accountAddress, setAccountAddress] = useState<string | null>(null);

  const newContractAddress = "0x8922a8a67787DBE73C1290AD8950993a430638c5";
  const oldContractAddress = "0x69617e5c47335049e806425883347b4797E7911b";

  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(
    null,
  );
  const [oldContract, setOldContract] = useState<ethers.Contract | null>(null);
  const [newContract, setNewContract] = useState<ethers.Contract | null>(null);

  const setupMetamask = async () => {
    if (ethereum) {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      accountChangedHandler(accounts[0]);
    }
  };

  const accountChangedHandler = (newAccountAddress: string) => {
    setAccountAddress(newAccountAddress);
    updateEthers();
  };

  const updateEthers = async () => {
    const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    const tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    const tempNewContract = new ethers.Contract(
      newContractAddress,
      BanishBearsAbi,
      tempSigner,
    );
    setNewContract(tempNewContract);

    const tempOldContract = new ethers.Contract(
      oldContractAddress,
      BanishBearsAbi,
      tempSigner,
    );
    setOldContract(tempOldContract);
  };

  return (
    <>
      <Navbar
        setupMetamask={setupMetamask}
        accountAddress={accountAddress}
        ethereum={ethereum}
      />
      <Header />
      <Lore />
      <Carousel />
      <Store setupMetamask={setupMetamask} accountAddress={accountAddress} />
      <FAQ />
      <Footer />
    </>
  );
};
