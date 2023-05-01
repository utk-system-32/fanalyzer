import { FunctionComponent, ReactNode, useEffect } from "react";
import Image from "next/image"
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

interface ForceLoginProps {
  children: ReactNode;
}

const ForceLogin: FunctionComponent<ForceLoginProps> = ({ children }) => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading" && !sessionData?.user) {
      router.push('/register');
    }
  }, [status, sessionData]);

  if (status === "loading") {
    return <Image src="/loading.gif" width={30} height={30} alt="Loading..."/>;
  }

  return <>{children}</>;
};

export default ForceLogin;