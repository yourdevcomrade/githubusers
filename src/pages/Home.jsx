import React from "react";
import { Info, Search, User } from "../components/";
import Loading from "../components/Loading";
import { useGlobalContext } from "../hooks/UseGlobalContext";

const Home = () => {
  const { isLoading } = useGlobalContext();
  if (isLoading) {
    return (
      <main>
        <Search />
        <Loading />
      </main>
    );
  }

  return (
    <div>
      <main>
        <Search />
        <Info />
        <User />
      </main>
    </div>
  );
};

export default Home;
