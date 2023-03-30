import { type NextPage } from "next";
import Layout_Dashboard from "../../components/Layout_Dashboard"
import Link from "next/link"
import Posts from "../../components/Posts"

const Dashboard: NextPage = () => {
    return(
    <Layout_Dashboard
        pageTitle = "My Posts"
        metaDescription="A collection of posts by the user."
    > 
    <aside id="sidebar" className="fixed top-[100px] left-0 z-40 w-50 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <div className="h-full px-3 py-4 overflow-y-auto border-2 bg-white">
        <ul className="space-y-2">
          <li>
            <a href="/dashboard" className="flex items-center p-2 text-base font-normal text-black">
              <svg className="w-6 h-6 bg-gray-400"></svg>
              <span className="ml-3">Creations</span>
            </a>
          </li>
          <li>
            <a href="/dashboard/posts" className="flex items-center p-2 text-base font-normal text-[#7d244f]">
              <svg className="w-6 h-6 bg-[#7d244f]"></svg>
              <span className="ml-3">Posts</span>
            </a>
          </li>
         <li>
            <a href="/dashboard/datasets" className="flex items-center p-2 text-base font-normal text-black">
              <svg className="w-6 h-6 bg-gray-400"></svg>
              <span className="ml-3">Datasets</span>
            </a>
         </li>
         <li>
            <a href="/documentation" className="flex items-center p-2 text-base font-normal text-black">
              <svg className="w-6 h-6 bg-gray-400"></svg>
              <span className="ml-3">Documentation</span>
            </a>
         </li>
        </ul>
      </div>
    </aside>

    <div className="left-[50px] p-4">
      <p className="left-[50px] font-bold text-2xl">My Posts</p>
    </div>

    <form>
      <div>
        <input type="search" id="search" className="w-[600px] p-4 text-sm text-black border-2 rounded-lg bg-white caret-black" placeholder="Search for posts..."></input>
      </div>
    </form>

    <Posts mode="my"/>

    </Layout_Dashboard>

    );
}

export default Dashboard;