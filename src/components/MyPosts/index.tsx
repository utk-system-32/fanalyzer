import { api } from '../../utils/api'

function MyPosts() {
    const postQuery = api.post.getMyPosts.useQuery("");
    
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

export default MyPosts;