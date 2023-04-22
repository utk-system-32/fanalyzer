import { type FC } from "react";
import Link from "next/link";
const DashboardSidebar: FC = () => {
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
              className="flex items-center p-2 text-base font-normal text-[#7d244f]"
            >
              <svg className="h-6 w-6 bg-[#7d244f]"></svg>
              <span className="ml-3">Creations</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/my-account"
              className="flex items-center p-2 text-base font-normal text-black"
            >
              <svg className="h-6 w-6 bg-gray-400"></svg>
              <span className="ml-3">Posts</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/datasets"
              className="flex items-center p-2 text-base font-normal text-black"
            >
              <svg className="h-6 w-6 bg-gray-400"></svg>
              <span className="ml-3">Datasets</span>
            </Link>
          </li>
          <li>
            <Link
              href="/documentation"
              className="flex items-center p-2 text-base font-normal text-black"
            >
              <svg className="h-6 w-6 bg-gray-400"></svg>
              <span className="ml-3">Documentation</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};
export default DashboardSidebar;
