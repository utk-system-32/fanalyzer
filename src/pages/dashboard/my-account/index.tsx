import { type NextPage } from "next";
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react";
import Layout_Dashboard from "../../../components/Layout_Dashboard"
import MyAccount from "src/components/MyAccount";
import Posts from "../../../components/Posts"
import DashboardSidebar from "src/components/DashboardSidebar";

const UserPage: NextPage = () => {
    return(
    <Layout_Dashboard
        pageTitle = "My Account | Fanalyzer"
        metaDescription="A page for the user to view their account"
    > 


    <DashboardSidebar page="account"/>
    <MyAccount/>
    <Posts mode="my"/>

    </Layout_Dashboard>

    );
}

export default UserPage;