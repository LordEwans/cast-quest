import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[480px] h-fit load">
        <Image
          src={require("../assets/img/CastQuest.svg")}
          width={720}
          height={720}
          alt="logo"
          className="w-[480px] h-fit"
        />
      </div>
    </div>
  );
};

export default Loading;
