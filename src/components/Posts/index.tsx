import { api } from '../../utils/api'

function Posts(username) {
    if (!username || username.userId === '') return (null);
    const usernameQuery = api.user.getIdByUsername.useQuery(username.userId);
    let userId = usernameQuery.data?.id;
    const postQuery = api.post.getUserPosts.useQuery(userId);
    const userQuery = api.user.getUserById.useQuery(userId);
    
    if (postQuery.isLoading) {
      return <p>Loading...</p>
    }
  return (
    <div>
      <div className="left-[50px] font-bold text-2xl p-4">{userQuery.data?.at(0)?.username}'s Feed</div>
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