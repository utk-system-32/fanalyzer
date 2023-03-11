import { type NextPage } from "next";
import Layout from "../../components/Layout";
import DashboardSidebar from "../../components/DashboardSidebar";

const Dashboard: NextPage = () => {
  return (
    <Layout
      pageTitle="My Datasets"
      metaDescription="Collection of Datasets that the user has uploaded"
    >
      <DashboardSidebar />

      <div className="left-[50px] p-4">
        <p className="left-[50px] text-2xl font-bold">My Datasets</p>
      </div>

      <form>
        <div>
          <input
            type="search"
            id="search"
            className="w-[600px] rounded-lg border-2 bg-white p-4 text-sm text-black caret-black"
            placeholder="Search for datasets..."
          />
          <button className="mx-3 rounded-md bg-[#ff8200] p-4 font-semibold text-white duration-300 ease-in-out hover:brightness-75">
            Add New Dataset
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Dashboard;
