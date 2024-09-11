"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import UserProfile from "./components/userprofile";
import Image from "next/image";
import Link from "next/link";
import Loading from "./components/loading";

const config = {};

const Home = () => {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={config}
    >
      {
        <div className="">
          {/*<Link href={"/"} className="max-w-14 max-h-14">
            <Image
              src={require("./assets/img/CastQuest.svg")}
              width={100}
              height={100}
              alt="logo"
              className="w-[720px] h-fit"
            />
          </Link>*/}
          <UserProfile />
        </div>
      }
    </PrivyProvider>
  );
};

export default Home;
