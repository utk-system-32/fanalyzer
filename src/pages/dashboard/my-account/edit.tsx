import { type NextPage } from "next";
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react";
import Layout_Dashboard from "../../../components/Layout_Dashboard"
import EditProfile from "../../../components/EditProfile"

const UserPage: NextPage = () => {
    const { data: sessionData } = useSession();
    return(
    <Layout_Dashboard
        pageTitle = ""
        metaDescription="A collection of posts by the user and their followers"
    > 

    <EditProfile/>

    </Layout_Dashboard>

    );
}

export default UserPage;