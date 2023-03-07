import { type NextPage } from "next";
import Layout from "../../components/Layout"
import Link from "next/link"

const Dashboard: NextPage = () => {
    return(
    <Layout
        pageTitle = "My Posts"
    > 
    <aside id="sidebar" class="fixed top-[100px] left-0 z-40 w-50 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <div class="h-full px-3 py-4 overflow-y-auto border-2 bg-white">
        <ul class="space-y-2">
          <li>
            <a href="/dashboard" class="flex items-center p-2 text-base font-normal text-black">
              <svg class="w-6 h-6 bg-gray-400"></svg>
              <span class="ml-3">Creations</span>
            </a>
          </li>
          <li>
            <a href="/dashboard/posts" class="flex items-center p-2 text-base font-normal text-[#7d244f]">
              <svg class="w-6 h-6 bg-[#7d244f]"></svg>
              <span class="ml-3">Posts</span>
            </a>
          </li>
         <li>
            <a href="/dashboard/datasets" class="flex items-center p-2 text-base font-normal text-black">
              <svg class="w-6 h-6 bg-gray-400"></svg>
              <span class="ml-3">Datasets</span>
            </a>
         </li>
         <li>
            <a href="/documentation" class="flex items-center p-2 text-base font-normal text-black">
              <svg class="w-6 h-6 bg-gray-400"></svg>
              <span class="ml-3">Documentation</span>
            </a>
         </li>
        </ul>
      </div>
    </aside>

    <div class="left-[50px] p-4">
      <p class="left-[50px] font-bold text-2xl">My Posts</p>
    </div>

    <form>
      <div>
        <input type="search" id="search" class="w-[600px] p-4 text-sm text-black border-2 rounded-lg bg-white caret-black" placeholder="Search for posts..."></input>
      </div>
    </form>

    </Layout>

    );
}

export default Dashboard;