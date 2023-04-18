import { type NextPage } from "next";
import Layout_Dashboard from "../../../components/Layout_Dashboard"
import ExploreSearch from "../../../components/ExploreSearch"
import Posts from "../../../components/Posts"
import Users from "../../../components/Users"
import { useRouter } from "next/router"

const Feed: NextPage = () => {
    const router = useRouter()
    const search = router.query.search ? router.query.search.toString() : ''

    return(
    <Layout_Dashboard
        pageTitle = "Explore"
        metaDescription="A collection of posts by the user and their followers"
    > 

    <div className="left-[50px] p-4">
      <p className="left-[50px] font-bold text-2xl">Explore</p>
    </div>

    <ExploreSearch/>

    </Layout_Dashboard>

    );
}

export default Feed;