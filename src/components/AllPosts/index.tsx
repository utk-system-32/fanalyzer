import { api } from '../../utils/api'

function AllPosts() {
    const postQuery = api.post.getAllPosts.useQuery("");
    
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

export default AllPosts;