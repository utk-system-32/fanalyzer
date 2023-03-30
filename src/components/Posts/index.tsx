import { api } from '../../utils/api'

function Posts(mode) {
    // get all/following/my posts depending on mode 
    const postQuery = 
      (mode.mode === "all") ?  api.post.getAllPosts.useQuery("") 
    : (mode.mode === "following") ? api.post.getFollowingPosts.useQuery("")
    : api.post.getMyPosts.useQuery("");

    if (postQuery.isLoading) {
      return <p>Loading...</p>
    }
  return (
    <div>
      {postQuery.data?.map((post) => {
        return (
          <article key={post.id}>
            <p className="font-bold">{post.title}</p>
            <p>{post.content}</p>
          </article>
        )
      })}
    </div>
  )
}

export default Posts;