import { type NextPage } from "next";
import Layout from "../../components/Layout";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "../../utils/api";
import DashboardSidebar from "src/components/DashboardSidebar";
import Layout_Dashboard from "src/components/Layout_Dashboard";
import UsernamePopUp from "src/components/UsernamePopUp";
import Visualizations from "src/components/Visualizations"

const Dashboard: NextPage = () => {
  return (
    <Layout_Dashboard
      pageTitle="My Creations | Fanalyzer"
      metaDescription="A collection of creations for the user."
    >
      <UsernamePopUp/>
      <DashboardSidebar page="index" />
      <div className="left-[50px] p-4">
        <p className="left-[50px] text-2xl font-bold">My Creations</p>
      </div>

      <Visualizations/>
    </Layout_Dashboard>
  );
};

export default Dashboard;