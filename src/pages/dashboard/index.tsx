import { type NextPage } from "next";
import Layout from "src/components/Layout";
import DashboardSidebar from "src/components/DashboardSidebar";

const Dashboard: NextPage = () => {
  return (
    <Layout
      pageTitle="My Creations"
      metaDescription="A collection of creations for the user."
    >
      <DashboardSidebar />
      <div className="left-[50px] p-4">
        <p className="left-[50px] text-2xl font-bold">My Creations</p>
      </div>
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
    </Layout>
  );
};

export default Dashboard;
