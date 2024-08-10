import Image from "next/image";
import Nav from "./components/Nav/Nav";
import Createmarket from "./components/CreateMarket/Createmarket";
import GetmarketList from "./components/MarketList/GetmarketList";

export default function Home() {
  return (
    <>
      <Nav/>
      <Createmarket />
      <GetmarketList />
    </>
  );
}
