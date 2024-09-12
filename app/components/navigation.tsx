import Image from "next/image";
import Link from "next/link";
import UserProfile from "./userprofile";
import { usePrivy } from "@privy-io/react-auth";
import Loading from "./loading";

const Navigation = () => {
  const { ready } = usePrivy();
  return (
    <div className="">
      {ready ? (
        <nav className="flex justify-between items-center px-4 py-2 shadow-md">
          <Link href={"/"} className="flex items-center">
            <Image
              src={require("../assets/img/CastQuest.svg")}
              width={720}
              height={720}
              alt="logo"
              className="w-fit h-[64px]"
              draggable="false"
            />
          </Link>
          {
            // include social media links here
          }
          <UserProfile />
        </nav>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Navigation;
