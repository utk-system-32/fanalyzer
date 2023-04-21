import { type NextPage } from "next";
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react";
import Layout_Dashboard from "../../../components/Layout_Dashboard"
import MyAccount from "src/components/MyAccount";
import Posts from "../../../components/Posts"

const UserPage: NextPage = () => {
    const { data: sessionData } = useSession();
    return(
    <Layout_Dashboard
        pageTitle = ""
        metaDescription="A collection of posts by the user and their followers"
    > 

    <MyAccount/>
    <Posts mode="my"/>

    </Layout_Dashboard>

    );
}

export default UserPage;