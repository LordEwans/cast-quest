"use client";

// import Image from "next/image";
import "@farcaster/auth-kit/styles.css";
import { AuthKitProvider } from "@farcaster/auth-kit";
import Login from "./components/signinbutton";
import UserProfile from "./components/userprofile";

const config = {
  rpcUrl: "https://mainnet.optimism.io",
  domain: "example.com",
  siweUri: "https://example.com/login",
};

const Home = () => {
  return (
    <AuthKitProvider config={config}>
      {
        <Login />
      }
      {
        <UserProfile />
      }
    </AuthKitProvider>
  );
};

export default Home;