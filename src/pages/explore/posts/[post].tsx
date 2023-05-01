import { type NextPage } from "next";
import { useRouter } from 'next/router'
import Layout_Dashboard from "src/components/Layout_Dashboard"
import IndividualPost from "src/components/IndividualPost"

const PostPage: NextPage = () => {
    const router = useRouter()
    const postId = router.query.post ? router.query.post.toString() : ''
    return(
    <Layout_Dashboard
        pageTitle ={`Post | Fanalyzer`}
        metaDescription="A collection of posts by the user and their followers"
    > 

    <IndividualPost mode={postId}/>

    </Layout_Dashboard>

    );
}

export default PostPage;