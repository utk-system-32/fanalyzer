import Link from "next/link";
import { type FunctionComponent, useState, useEffect, useRef } from "react";
import useHasScrolledDown from "../../utils/useHasScrolledDown";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image"

interface Props {
  handleCreatePostClick: () => void;
}
// Header for when your already logged into the site

const Header_Dashboard: FunctionComponent<Props> = ({ handleCreatePostClick }) => {
  const scrolledDown = useHasScrolledDown();
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <>
      <section
        className={`fixed z-50 flex w-full justify-center ${
          router.pathname == "/" ? "bg-none" : "border-b bg-white "
        } ${scrolledDown ? "border-b bg-white/[0.7] backdrop-blur" : ""}`}
      >
        <nav
          className={`flex w-full max-w-[1280px] mx-10 flex-wrap justify-between self-center py-7 ${
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
            <div className="relative">
              <button onClick={() => setShowPopup(!showPopup)} className="flex flex-row text-lg font-bold">
                <Image
                  src={sessionData?.user?.image.startsWith("https") ? sessionData.user.image : `data:image/png;base64,${sessionData?.user?.image}`}
                  width={50}
                  height={50}
                  className="h-[50px]  w-[50px] rounded-full mx-2"
                  alt={`${sessionData?.user?.username}'s profile picture`}
                />
              <p className="mt-2">{sessionData?.user?.username}</p>
              </button>
              {showPopup && (
                <div ref={popupRef} className="absolute right-0 bg-white border border-gray-300 rounded-lg shadow-md p-6 mt-1 text-sm">
                  <Link href="/dashboard/my-account">My Account</Link>
                  <button
                    className="rounded-full bg-white/10 py-3 font-semibold no-underline transition hover:bg-white/20"
                    onClick={() => { void signOut({ callbackUrl: `${window.location.origin}`})}}
                    >
                    Sign Out
                  </button>
                </div>
              )}
          </div>
          </div>
        </nav>
      </section>
      {router.pathname != "/" && <div className="h-[108px] w-full"></div>}
    </>
  );
};

export default Header_Dashboard;
