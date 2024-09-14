/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "next/navigation";
import {
  usePrivy,
  useSetWalletRecovery,
  useWallets,
} from "@privy-io/react-auth";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

// include dynamically fetching profile and differenciating from signed in user

type User = {
  username: any;
  pfp: any;
  bio: any;
  displayName: any;
  fid: string | string[];
};
const Profile = () => {
  const params = useParams();
  const fid = params.fid;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userData, setUserData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const { wallets } = useWallets();

  const { setWalletRecovery } = useSetWalletRecovery();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://hoyt.farcaster.xyz:2281/v1/userDataByFid?fid=${fid}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const arr = data.messages;

        const user: User = {
          username: "",
          pfp: "",
          bio: "",
          displayName: "",
          fid,
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        arr.forEach((i: any) => {
          switch (i.data.userDataBody.type) {
            case "USER_DATA_TYPE_USERNAME":
              user.username = i.data.userDataBody.value;
              break;
            case "USER_DATA_TYPE_PFP":
              user.pfp = i.data.userDataBody.value;
              break;
            case "USER_DATA_TYPE_BIO":
              user.bio = i.data.userDataBody.value;
              break;
            case "USER_DATA_TYPE_DISPLAY":
              user.displayName = i.data.userDataBody.value;
              break;
            default:
              break;
          }
        });
        console.log(data.messages, user);
        setUserData(user);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred."));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fid]);

  const user = userData;
  const { user: userIn } = usePrivy();

  const [showCopiedModal, setShowCopiedModal] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowCopiedModal(true);
    setTimeout(() => {
      setShowCopiedModal(false);
    }, 1200);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto mt-8 p-4 rounded-lg shadow-md relative min-h-16 flex items-center justify-center">
        <span className="load">Loading user data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto mt-8 p-4 rounded-lg shadow-md relative min-h-16 flex items-center justify-center">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 p-4 rounded-lg shadow-md relative">
      {/* Relative parent for absolute positioning of the modal */}

      {showCopiedModal && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
             bg-[#8962d1] text-white px-4 py-2 rounded-md transition-opacity duration-[400ms] ease-in-out"
          style={{ opacity: showCopiedModal ? 1 : 0 }} // Control opacity for transition
        >
          Copied to clipboard!
        </div>
      )}

      {
        <>
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex items-center mb-6">
            <Link
              href={`https://warpcast.com/${user.username}`}
              className="mr-6"
              target="_blank"
            >
              <Image
                src={user.pfp || "/default-pfp.png"}
                width={480}
                height={480}
                alt="pfp"
                style={{ objectFit: "cover" }}
                className="w-32 h-32 rounded-full border border-[#8962d1]"
                draggable="false"
              />
            </Link>

            <div>
              <h2 className="text-2xl font-bold">
                {user.displayName || user.username}
              </h2>
              <p className="text-[#976de6]">@{user.username}</p>
            </div>
          </div>

          <button
            onClick={() => setWalletRecovery()}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#976de6] h-fit min-h-8 text-left rounded-md _1n3pr301"
            role="menuitem"
          >
            Lock Wallet
          </button>
          </div>

          <p className="text-lg mb-4">{user.bio || "No bio yet."}</p>

          <div className="border-t border-[#8962d1] pt-4">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-[#976de6]">Fid</dt>
                <dd
                  className="mt-1 text-sm cursor-pointer bg-[#8962d129] w-fit"
                  onClick={() =>
                    copyToClipboard(user.farcaster!.fid!.toString())
                  }
                >
                  {user.fid || fid}
                </dd>
              </div>
              {user.fid == userIn?.farcaster?.fid ? (
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-[#976de6]">
                    Address
                  </dt>
                  <dd
                    className="mt-1 text-sm cursor-pointer bg-[#8962d129] w-fit"
                    onClick={() =>
                      copyToClipboard(wallets[0].address.toString())
                    }
                  >
                    {wallets[0].address.toString()}
                  </dd>
                </div>
              ) : (
                <></>
              )}

              {/* Add more profile fields as needed */}
            </dl>
          </div>
        </>
      }
    </div>
  );
};

export default Profile;
