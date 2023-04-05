import { api } from '../../utils/api'

function Posts(mode) {
    // get all/following/my posts depending on mode
    const date: Date = new Date();
    let dateString = ""
    //const postQuery = api.post.getByUser.useQuery("test");

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
        const date = post.createdAt
        dateString = date.toString();
        //const nameString = api.user.getUserByID.useQuery(post.authorId)
        const nameString = "John Doe"
        const emptyString = " "
        
        return (
          <article key={post.id}>
            <p>{nameString}</p>
            <p className="font-bold">{post.title}</p>
            <p>{post.content}</p>
            <p>{dateString}</p>
            <p>{emptyString}</p>
          </article>
        )
      })}
    </div>
  )
}

export default Posts;