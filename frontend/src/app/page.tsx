import Image from "next/image";
import Nav from "./components/Nav";
import Createmarket from "./components/Createmarket";
import GetmarketList from "./components/GetmarketList";

export default function Home() {
  return (
    <>
      <Nav/>
      <Createmarket />
      <h1>Market List</h1>
      <GetmarketList />
    </>
  );
}
