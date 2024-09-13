"use client";

import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import Navigation from "./components/navigation";
import Loading from "./components/loading";
// import Image from "next/image";
// import Link from "next/link";
// import Loading from "./components/loading";

const config = {};

const AppContent = () => {
  const { ready, authenticated, login } = usePrivy();

  if (!ready) {
    return <Loading />;
  }

  return (
    <>
      <Navigation />
      <div className="container mx-auto rounded-lg shadow-md relative min-h-[calc(100vh-160px)] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <button className="_1n3pr301 w-[126px]" onClick={() => {authenticated? newQuest : login()}}>New Quest</button>
          <span className="">You don&#39;t have any quests yet.</span>
        </div>
      </div>
    </>
  );
};

const Home = () => {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={config}
    >
      <AppContent />
    </PrivyProvider>
  );
};

export default Home;

const newQuest = () => {
  
}