import { type NextPage } from "next";
import Layout_Dashboard from "../../../components/Layout_Dashboard"
import EditProfile from "../../../components/EditProfile"
import DashboardSidebar from "src/components/DashboardSidebar";

const UserPage: NextPage = () => {
    return(
    <Layout_Dashboard
        pageTitle = "Edit Profile | Fanalyzer"
        metaDescription="A page for the user to edit their profile"
    > 

    <DashboardSidebar page="account"/>

    <EditProfile/>

    </Layout_Dashboard>

    );
}

export default UserPage;