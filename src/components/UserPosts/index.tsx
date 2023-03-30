import { api } from '../../utils/api'

function UserPosts(username) {
    if (!username || username.userId === '') return (null);
    const usernameQuery = api.user.getUserByUsername.useQuery(username.userId);
    let userId = usernameQuery.data?.id;
    const postQuery = api.post.getUserPosts.useQuery(userId);
    
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

export default UserPosts;