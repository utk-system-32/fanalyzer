import { type NextPage } from "next";
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react";
import Layout_Dashboard from "../../../components/Layout_Dashboard"
import EditProfile from "../../../components/EditProfile"
import DashboardSidebar from "src/components/DashboardSidebar";

const UserPage: NextPage = () => {
    const { data: sessionData } = useSession();
    return(
    <Layout_Dashboard
        pageTitle = ""
        metaDescription="A collection of posts by the user and their followers"
    > 

    <DashboardSidebar page="account"/>

    <EditProfile/>

    </Layout_Dashboard>

    );
}

export default UserPage;