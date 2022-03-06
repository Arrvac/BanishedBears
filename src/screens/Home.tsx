import { useState } from "react";
import styled from "styled-components";
import { FAQ } from "../components/FAQ";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Navbar } from "../components/layout/Navbar";
import { Lore } from "../components/Lore";
import { Store } from "../components/Store";

declare var window: any;

export const Home = () => {
  const ethereum = window.ethereum;
  const [accountAddress, setAccountAddress] = useState<string | null>(null);

  const setupMetamask = async () => {
    if (ethereum) {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccountAddress(accounts[0]);
    }
  };

  if (ethereum) {
    ethereum.on("accountsChanged", function (accounts: string[]) {
      if (accounts.length > 0) {
        setAccountAddress(accounts[0]);
      }
    });
  }

  return (
    <>
      <Navbar
        setupMetamask={setupMetamask}
        accountAddress={accountAddress}
        ethereum={ethereum}
      />
      <Header />
      <Lore />
      <Store setupMetamask={setupMetamask} accountAddress={accountAddress} />
      <FAQ />
      <Footer />
    </>
  );
};
