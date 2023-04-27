import { FunctionComponent } from 'react';
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image"

const DashboardSidebar: FunctionComponent = (page) => {
  const { data: sessionData } = useSession();

  return (
    <aside
      id="sidebar"
      className="w-50 fixed top-[100px] left-0 z-40 h-screen -translate-x-full transition-transform sm:translate-x-0"
    >
      <div className="h-full overflow-y-auto border-2 bg-white px-3 py-4">
        <ul className="space-y-2">
          <li className="flex flex-row text-lg font-bold">
            <Image
              src={sessionData?.user?.image.startsWith("https") ? sessionData.user.image : `data:image/png;base64,${sessionData?.user?.image}`}
              width={50}
              height={50}
              className="h-[50px]  w-[50px] rounded-full mx-2"
              alt={`${sessionData?.user?.username}'s profile picture`}
            />
            <p className="mt-2">{sessionData?.user?.username}</p>
          </li>
          <li>
            <Link
              href="/dashboard"
              className={`flex items-center p-2 text-base font-normal ${page.page === "index" ? "text-[#7d244f]" : "text-black"}`}
            >
              <svg className={`h-6 w-6 ${page.page === "index" ? "bg-[#7d244f]" : "bg-gray-400"}`}></svg>
              <span className="ml-3">Creations</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/my-account"
              className={`flex items-center p-2 text-base font-normal ${page.page === "account" ? "text-[#7d244f]" : "text-black"}`}
            >
              <svg className={`h-6 w-6 ${page.page === "account" ? "bg-[#7d244f]" : "bg-gray-400"}`}></svg>
              <span className="ml-3">My Account</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/documentation"
              className={`flex items-center p-2 text-base font-normal ${page.page === "documentation" ? "text-[#7d244f]" : "text-black"}`}
            >
              <svg className={`h-6 w-6 ${page.page === "documentation" ? "bg-[#7d244f]" : "bg-gray-400"}`}></svg>
              <span className="ml-3">Documentation</span>
            </Link>
          </li>
        </ul>
        <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        onClick={() => { void signOut({ callbackUrl: `${window.location.origin}`})}}
        >
        Sign Out
      </button>
      </div>
    </aside>
  );
};
export default DashboardSidebar;
