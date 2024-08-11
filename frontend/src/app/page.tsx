import Image from "next/image";
import Nav from "./components/Nav/Nav";
import Createmarket from "./components/CreateMarket/Createmarket";
import GetmarketList from "./components/MarketList/GetmarketList";
import Header from "./components/Header/Header";

export default function Home() {
  return (
    <>
      <Nav/>
      <Header />
      <Createmarket />
      <GetmarketList />
    </>
  );
}
