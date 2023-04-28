import { type NextPage } from "next";
import Layout_Dashboard from "../../components/Layout_Dashboard";
import DashboardSidebar from "src/components/DashboardSidebar";

const Documentation: NextPage = () => {
  return (
    <Layout_Dashboard
      pageTitle="Documentation | Fanalyzer"
      metaDescription="Learn about how to use Fanalyzer."
    >
      <DashboardSidebar page="documentation"/>
      Documentation for how to user Fanalayzer will go here. 
    </Layout_Dashboard>

    
  );
};

export default Documentation;
