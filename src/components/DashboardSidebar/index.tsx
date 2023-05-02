import { FunctionComponent } from 'react';
import Link from "next/link";

const DashboardSidebar: FunctionComponent = (page) => {

  return (
    <aside
      id="sidebar"
      className="w-50 fixed top-[100px] left-0 z-40 h-screen -translate-x-full transition-transform sm:translate-x-0"
    >
      <div className="h-full overflow-y-auto border-2 bg-white px-3 py-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className={`flex items-center p-2 text-base font-normal ${page.page === "index" ? "text-[#7d244f]" : "text-black"}`}
            >
              <svg className={`h-6 w-6 ${page.page === "index" ? "bg-[#7d244f]" : "bg-gray-400"}`}></svg>
              <span className="ml-3">My Creations</span>
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
      </div>
    </aside>
  );
};
export default DashboardSidebar;
