import { type NextPage } from "next";
import { useRouter } from 'next/router'
import Layout_Dashboard from "../../components/Layout_Dashboard"
import UserPosts from "../../components/UserPosts"
import Profile from "../../components/Profile"

const UserPage: NextPage = () => {
    const router = useRouter()
    const username = router.query.username ? router.query.username.toString() : ''
    return(
    <Layout_Dashboard
        pageTitle ={`${username} | Fanalyzer`}
        metaDescription="A collection of posts by the user and their followers"
    > 

    <Profile userId={username}/>
    <UserPosts userId={username}/>

    </Layout_Dashboard>

    );
}

export default UserPage;