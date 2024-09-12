import { usePrivy } from "@privy-io/react-auth";
import Login from "./signinbutton";
import Image from "next/image";
import Link from "next/link";

// complete and enable drop down for user profile
const UserProfile = () => {
  const { user, authenticated } = usePrivy();
  return (
    <div className="">
      {" "}
      {authenticated && user!.farcaster ? (
        <p>
          <Link href={user!.farcaster.url || "/"} className="max-w-14 max-h-14">
            <Image
              src={user!.farcaster.pfp!}
              width={640}
              height={640}
              alt="pfp"
              style={{ objectFit: "cover" }}
              className="w-14 h-14 rounded-full"
              draggable="false"
            />
          </Link>
          {user!.farcaster!.displayName!}
          <br /> @{user!.farcaster!.username}
          <br /> {user!.farcaster.bio}
          <br /> Fid: {user!.farcaster!.fid} <br /> Address:{" "}
          {user!.farcaster!.ownerAddress}
        </p>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default UserProfile;
