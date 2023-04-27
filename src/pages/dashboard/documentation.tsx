import { type NextPage } from "next";
import Layout from "../../components/Layout";
import DashboardSidebar from "src/components/DashboardSidebar";

const Documentation: NextPage = () => {
  return (
    <Layout
      pageTitle="Documentation for Fanalyzer | Fanalyzer"
      metaDescription="Learn about how to use Fanalyzer."
    >
      <DashboardSidebar page="documentation"/>
      Documentation for how to user Fanalayzer will go here. 
    </Layout>

    
  );
};

export default Documentation;
