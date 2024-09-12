import Image from "next/image";
import Link from "next/link";
import ProfileDropdown from "./profiledropdown";

const Navigation = () => {
  return (
    <div className="flex justify-center items-center w-full shadow-md">
      <nav className="flex justify-between items-center px-4 py-2 container">
        <Link href={"/"} className="flex items-center">
          <Image
            src={require("../assets/img/CastQuest.svg")}
            width={720}
            height={720}
            alt="logo"
            className="w-fit h-[64px] max-[366px]:h-[48px]"
            draggable="false"
          />
        </Link>
        {
          // include social media links here
        }
        <ProfileDropdown />
      </nav>
    </div>
  );
};

export default Navigation;
