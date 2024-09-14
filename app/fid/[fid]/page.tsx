"use client";

import { PrivyProvider, usePrivy, useWallets } from "@privy-io/react-auth";
import Navigation from "../../components/navigation";
import Profile from "../../components/profileSetting";
import Loading from "../../components/loading";

const config = {};

const AppContent = () => {
  const { ready } = usePrivy();

  const { ready: ready2 } = useWallets();

  if (!ready || !ready2) {
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
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={config}
    >
      <AppContent />
    </PrivyProvider>
  );
};

export default Home;
