import Link from "next/link";
import { type FunctionComponent } from "react";
import useHasScrolledDown from "../../utils/useHasScrolledDown";
import { useRouter } from "next/router";

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
          className={`flex w-full max-w-[1280px] flex-wrap justify-between self-center py-7 ${
            router.pathname == "/"
              ? scrolledDown
                ? "text-black"
                : "text-white"
              : "text-black"
          }
         duration-100 ease-in-out`}
        >
          <Link href="/" className={`flex items-center text-3xl font-bold`}>
            Fanalyzer
          </Link>
          <div className="ml-auto flex items-center text-xl">
            <Link href="/" className="mx-3 rounded-md">
              Home
            </Link>
            <Link href="/about" className="mx-3 rounded-md p-1">
              About
            </Link>
            <Link href="/contact" className="mx-3 rounded-md p-1">
              Contact
            </Link>
            <Link href="/documentation" className="mx-3 rounded-md p-1">
              Documentation
            </Link>
            <Link
              href="/register"
              className="mx-3 rounded-md bg-[#ff8200] p-2 font-semibold text-white"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </section>
      {router.pathname != "/" && <div className="h-[108px] w-full"></div>}
    </>
  );
};

export default Header;
