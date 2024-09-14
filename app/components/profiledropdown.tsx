import { useState, useRef, useEffect } from "react";
import { useCreateWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import Login from "./signinbutton";
import Image from "next/image";
import Link from "next/link";

const ProfileDropdown = () => {
  const { user, authenticated, logout } = usePrivy();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { wallets } = useWallets();
  const { createWallet } = useCreateWallet();
  if (authenticated && user!.farcaster) if (!wallets[0]) createWallet();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative inline-block text-left z-50" ref={dropdownRef}>
      {authenticated && user!.farcaster ? (
        <>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center focus:outline-none"
          >
            <Image
              src={user!.farcaster.pfp!}
              width={640}
              height={640}
              alt="pfp"
              style={{ objectFit: "cover" }}
              className="w-14 h-14 rounded-full"
              draggable="false"
            />
          </button>
          {isOpen && (
            <div className="origin-top-right absolute right-0 mt-2 h-fit w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
              <div
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <Link
                  href={`/fid/${user!.farcaster!.fid!}`}
                  className="block px-4 py-2 text-sm text-gray-700 rounded-md _1n3pr301"
                  role="menuitem"
                >
                  <span className="flex items-center">
                    <Image
                      src={user!.farcaster.pfp!}
                      width={640}
                      height={640}
                      alt="pfp"
                      style={{ objectFit: "cover" }}
                      className="w-8 h-8 rounded-full mr-2"
                      draggable="false"
                    />
                    @{user!.farcaster!.username!}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#976de6] w-full min-h-8 text-left rounded-md _1n3pr301"
                  role="menuitem"
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default ProfileDropdown;
