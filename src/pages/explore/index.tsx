import { type NextPage } from "next";
import Layout_Dashboard from "../../components/Layout_Dashboard"
import ExploreSearch from "../../components/ExploreSearch"
import Posts from "../../components/Posts"

const Feed: NextPage = () => {
    return(
    <Layout_Dashboard
        pageTitle = "Explore | Fanalyzer"
        metaDescription="A collection of posts by the user and their followers"
    > 

    <div className="left-[50px] p-4">
      <p className="left-[50px] font-bold text-2xl">Explore</p>
    </div>
    <ExploreSearch/>
    <Posts mode="all"/>
    </Layout_Dashboard>

    );
}

export default Feed;