import { type NextPage } from "next";
import Layout from "../../components/Layout"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "../../utils/api"
import DashboardSidebar from "src/components/DashboardSidebar";
import Layout_Dashboard from "src/components/Layout_Dashboard";

const Dashboard: NextPage = () => {
  return (
    <Layout_Dashboard
      pageTitle="My Creations"
      metaDescription="A collection of creations for the user."
    >
      <DashboardSidebar />
      <div className="left-[50px] p-4">
        <p className="left-[50px] text-2xl font-bold">My Creations</p>
      </div>

    <AuthShowcase/>
      <form>
        <div>
          <input
            type="search"
            id="search"
            className="w-[600px] rounded-lg border-2 bg-white p-4 text-sm text-black caret-black"
            placeholder="Search for creations..."
          ></input>
        </div>
      </form>
    </Layout_Dashboard>
  );
};

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
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        onClick={ () => createpost}
        >
          Create Post
      </button>
    </div>
  );
};
