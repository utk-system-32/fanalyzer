import { type NextPage } from "next";
import Layout_Dashboard from "../../components/Layout_Dashboard"
import UserSearch from "../../components/UserSearch"
import AllPosts from "../../components/AllPosts"

const Feed: NextPage = () => {
    return(
    <Layout_Dashboard
        pageTitle = "Explore"
        metaDescription="A collection of posts by the user and their followers"
    > 

    <div className="left-[50px] p-4">
      <p className="left-[50px] font-bold text-2xl">Explore</p>
    </div>
    <UserSearch/>
    <AllPosts/>
    </Layout_Dashboard>

    );
}

export default Feed;