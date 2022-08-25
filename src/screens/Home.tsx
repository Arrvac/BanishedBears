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
import WrapperAbi from "../assets/abi/wrapper.json";

declare var window: any;

type Bear = {
  name: string;
  attributes: {
    trait_type: string;
    value: string;
    points: number;
  }[];
  image: string;
  id: number;
};

export const Home = () => {
  const ethereum = window.ethereum;
  const [accountAddress, setAccountAddress] = useState<string | null>(null);

  const newContractAddress = "0x8922a8a67787DBE73C1290AD8950993a430638c5";
  const oldContractAddress = "0x69617e5c47335049e806425883347b4797E7911b";
  const wrapperContractAddress = "0x8ce76CDa1658a7dd8019FA5EffbaBe77E22CF2F9";

  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(
    null,
  );
  const [oldContract, setOldContract] = useState<ethers.Contract | null>(null);
  const [wrapperContract, setWrapperContract] =
    useState<ethers.Contract | null>(null);
  const [newContract, setNewContract] = useState<ethers.Contract | null>(null);

  const [bearsUnWrap, setBearsUnWrap] = useState<Bear[]>([]);
  const [bearsWrap, setBearsWrap] = useState<Bear[]>([]);

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

    setNewContract(
      new ethers.Contract(newContractAddress, BanishBearsAbi, tempSigner),
    );

    setOldContract(
      new ethers.Contract(oldContractAddress, BanishBearsAbi, tempSigner),
    );

    setWrapperContract(
      new ethers.Contract(wrapperContractAddress, WrapperAbi, tempSigner),
    );
  };

  useEffect(() => {
    if (oldContract) {
      fetchAllBears(oldContract, setBearsUnWrap);
    }
  }, [oldContract]);

  useEffect(() => {
    if (newContract) {
      fetchAllBears(newContract, setBearsWrap);
    }
  }, [newContract]);

  const fetchAllBears = async (
    contract: ethers.Contract,
    setBears: (bear: Bear[]) => void,
  ) => {
    const numberOfBears = Number(await contract.balanceOf(accountAddress));
    const localBears: Bear[] = [];

    for (let i = 0; i < numberOfBears; i++) {
      const numberOfBear = await contract.tokenOfOwnerByIndex(
        accountAddress,
        i,
      );
      const json = await contract.tokenURI(Number(numberOfBear));
      const bear = await (await fetch(String(json))).json();
      localBears.push(bear);
    }
    setBears(localBears);
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
      <Store
        setupMetamask={setupMetamask}
        accountAddress={accountAddress}
        bearsUnWrap={bearsUnWrap}
        bearsWrap={bearsWrap}
        newContract={newContract}
        oldContract={oldContract}
        wrapperContract={wrapperContract}
      />
      <FAQ />
      <Footer />
    </>
  );
};
