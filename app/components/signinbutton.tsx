import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";

function Login() {
  const { ready, authenticated, login } = usePrivy();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  return (
    <>
      {!disableLogin ? (
        <button
          type="button"
          className="_1n3pr301"
          disabled={disableLogin}
          onClick={login}
        >
          <Image src={require("../assets/img/farcaster.svg")} width={18} height={16} alt="farcaster-logo" />
          <span style={{ marginLeft: "9px" }}>Sign in</span>
        </button>
      ) : (
        <></>
      )}
    </>
  );
}

export default Login;
