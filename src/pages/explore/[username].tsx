import { type NextPage } from "next";
import { useRouter } from 'next/router'
import Layout_Dashboard from "../../components/Layout_Dashboard"
import Link from "next/link"
import Posts from "../../components/Posts"

const UserPage: NextPage = () => {
    const router = useRouter()
    const username = router.query.username ? router.query.username.toString() : ''
    return(
    <Layout_Dashboard
        pageTitle = ""
        metaDescription="A collection of posts by the user and their followers"
    > 

    <Posts userId={username}/>

    </Layout_Dashboard>

    );
}

export default UserPage;