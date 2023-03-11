import { type NextPage } from "next";
import Layout from "../../components/Layout"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "../../utils/api";

const Dashboard: NextPage = () => {
  return(
  <Layout
    pageTitle = "My Creations"
  > 
    <aside id="sidebar" className="fixed top-[100px] left-0 z-40 w-50 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <div className="h-full px-3 py-4 overflow-y-auto border-2 bg-white">
        <ul className="space-y-2">
          <li>
            <a href="/dashboard" className="flex items-center p-2 text-base font-normal text-[#7d244f]">
              <svg className="w-6 h-6 bg-[#7d244f]"></svg>
              <span className="ml-3">Creations</span>
            </a>
          </li>
          <li>
            <a href="/dashboard/posts" className="flex items-center p-2 text-base font-normal text-black">
              <svg className="w-6 h-6 bg-gray-400"></svg>
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
    <AuthShowcase/>

    <div className="left-[50px] p-4">
      <p className="left-[50px] font-bold text-2xl">My Creations</p>
    </div>

    <form>
      <div>
        <input type="search" id="search" className="w-[600px] p-4 text-sm text-black border-2 rounded-lg bg-white caret-black" placeholder="Search for creations..."></input>
      </div>
    </form>

  </Layout>
  );
}

export default Dashboard;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};