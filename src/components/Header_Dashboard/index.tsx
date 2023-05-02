import Link from "next/link";
import Image from "next/image";
import { type FunctionComponent } from "react";
import useHasScrolledDown from "../../utils/useHasScrolledDown";
import { useRouter } from "next/router";

interface Props {
  handleCreatePostClick: () => void;
}
// Header for when your already logged into the site

const Header_Dashboard: FunctionComponent<Props> = ({ handleCreatePostClick }) => {
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
          <Link href="/dashboard" className={`flex items-center text-3xl font-bold`}>
            <Image width="120" height="50" src="/name.png" alt="" />
          </Link>
          <div className="ml-auto flex items-center text-xl">
            <Link href="/dashboard" className="mx-3 rounded-md">
              Dashboard
            </Link>
            <Link href="/explore" className="mx-3 rounded-md p-1">
              Explore
            </Link>
            <Link href="/feed" className="mx-3 rounded-md p-1">
              Feed
            </Link>
            <Link
              href="/tool"
              className="mx-3 rounded-md bg-[#ff8200] p-2 font-semibold text-white"
            >
              Create Visualization
            </Link>
            <button
              className="mx-3 rounded-md bg-[#ff8200] p-2 font-semibold text-white"
              onClick={handleCreatePostClick}
            >
              Create Post
            </button>
          </div>
        </nav>
      </section>
      {router.pathname != "/" && <div className="h-[108px] w-full"></div>}
    </>
  );
};

export default Header_Dashboard;
