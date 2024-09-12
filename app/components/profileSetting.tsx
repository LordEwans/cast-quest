import { useParams } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// include dynamically fetching profile and differenciating from signed in user

const Profile = () => {
  const params = useParams();
  const fid = params.fid;
  const { user, authenticated } = usePrivy();
  const [showCopiedModal, setShowCopiedModal] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowCopiedModal(true); 
    setTimeout(() => {
      setShowCopiedModal(false);
    }, 1200); 
  };

  return (
    <div className="container mx-auto mt-8 p-4 rounded-lg shadow-md relative"> 
      {/* Relative parent for absolute positioning of the modal */}

      {showCopiedModal && ( 
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
             bg-[#8962d1] text-white px-4 py-2 rounded-md transition-opacity duration-[400ms] ease-in-out"
             style={{ opacity: showCopiedModal ? 1 : 0 }} // Control opacity for transition
        >
          Copied to clipboard!
        </div>
      )}

      {authenticated && user?.farcaster ? (
        <>
          <div className="flex items-center mb-6">
            <Link
              href={`https://warpcast.com/${user.farcaster.username}`}
              className="mr-6"
              target="_blank"
            >
              <Image
                src={user.farcaster.pfp || "/default-pfp.png"}
                width={640}
                height={640}
                alt="pfp"
                style={{ objectFit: "cover" }}
                className="w-32 h-32 rounded-full border border-[#8962d1]"
                draggable="false"
              />
            </Link>

            <div>
              <h2 className="text-2xl font-bold">
                {user.farcaster.displayName || user.farcaster.username}
              </h2>
              <p className="text-[#976de6]">
                @{user.farcaster.username}
              </p>
            </div>
          </div>

          <p className="text-lg mb-4">
            {user.farcaster.bio || "No bio yet."}
          </p>

          <div className="border-t border-[#8962d1] pt-4">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-[#976de6]">
                  Fid
                </dt>
                <dd
                  className="mt-1 text-sm cursor-pointer bg-[#8962d129] w-fit"
                  onClick={() =>
                    copyToClipboard(user.farcaster!.fid!.toString())
                  }
                >
                  {user.farcaster.fid || fid}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-[#976de6]">
                  Address
                </dt>
                <dd
                  className="mt-1 text-sm cursor-pointer bg-[#8962d129] w-fit"
                  onClick={() =>
                    copyToClipboard(user.farcaster!.ownerAddress)
                  }
                >
                  {user.farcaster.ownerAddress}
                </dd>
              </div>
              {/* Add more profile fields as needed */}
            </dl>
          </div>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
