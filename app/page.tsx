"use client";

import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import Navigation from "./components/navigation";
import Loading from "./components/loading";
// import Image from "next/image";
// import Link from "next/link";
// import Loading from "./components/loading";

const config = {};

const AppContent = () => {
  const { ready } = usePrivy();

  if (!ready) {
    return <Loading />;
  }

  return (
    <>
      <Navigation />
    </>
  );
};

const Home = () => {
  return (
    <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!} config={config}>
      <AppContent /> 
    </PrivyProvider>
  );
};

export default Home;
