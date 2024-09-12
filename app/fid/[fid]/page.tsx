"use client";

import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import Navigation from "../../components/navigation";
import Profile from "../../components/profileSetting";
import Loading from "../../components/loading";

const config = {};

const AppContent = () => {
  const { ready } = usePrivy();

  if (!ready) {
    return <Loading />;
  }

  return (
    <>
      <Navigation />
      <Profile />
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
