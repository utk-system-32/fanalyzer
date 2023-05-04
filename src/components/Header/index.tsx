import Link from "next/link";
import Image from "next/image"
import { type FunctionComponent } from "react";
import useHasScrolledDown from "../../utils/useHasScrolledDown";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const Header: FunctionComponent = () => {
  const scrolledDown = useHasScrolledDown();
  const router = useRouter();
  return (
    <>
      <section
        className={`fixed z-50 flex w-full justify-center ${
          router.pathname == "/" ? "bg-none" : "border-b bg-white "
        } ${scrolledDown ? "border-b bg-white/[0.7] backdrop-blur" : ""}`}
      >
        <nav
          className={`flex mx-10 w-full max-w-[1280px] flex-wrap justify-between self-center py-7 ${
            router.pathname == "/"
              ? scrolledDown
                ? "text-black"
                : "text-white"
              : "text-black"
          }
         duration-100 ease-in-out`}
        >
          <Link href="/" className={`flex items-center text-3xl font-bold`}>
              <Image width="200" height="70" src="/name.png" alt="" />
          </Link>
          <div className="ml-auto flex items-center text-xl">
            <Link href="/" className="mx-3 rounded-md">
              Home
            </Link>
            <Link href="/about" className="mx-3 rounded-md p-1">
              About
            </Link>
            <Link href="mailto:bliuag@vols.utk.edu" className="mx-3 rounded-md p-1">
              Contact
            </Link>
            <button
              onClick={ () => signIn()}
              className="mx-3 rounded-md bg-[#ff8200] p-2 font-semibold text-white"
            >
              Sign In
            </button>
          </div>
        </nav>
      </section>
      {router.pathname != "/" && <div className="h-[108px] w-full"></div>}
    </>
  );
};

export default Header;
