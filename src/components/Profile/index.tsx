import { api } from '../../utils/api'
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function Profile(username) {
  // wait for username to return
  if (!username || username.userId === '') return (null);
  const router = useRouter();

  const { data: sessionData } = useSession();

  // get userId from username
  const userQuery = api.user.getUserByUsername.useQuery(username.userId);
  let userId = userQuery.data?.id;

  // reroute user from accessing their own profile page to their own posts page (TODO: FIX)
  //if (userId === sessionData?.user?.id) router.push("/dashboard/posts")

  // variable to display # of posts by user
  const postQuery = api.post.getUserPosts.useQuery(userId);
  const numPosts = postQuery.data?.length;
  let posts;
  numPosts == 1 ? posts = "Post" : posts = "Posts"

  // variables to display # of user's followers/following 
  const followerQuery = api.user.getUserFollowers.useQuery(userId);
  const followingQuery = api.user.getUserFollowing.useQuery(userId);
  
  // variable to keep track of whether the current user is following the user's 
  // page they are looking at 
  const isFollowingQuery = api.follow.userIsFollowing.useQuery(userId);

  // handle user follow
  const followMutation = api.follow.followUser.useMutation();

  const handleFollow = () => {
    followMutation.mutate(userId);
    router.reload()
  }

  // display loading while fetching API calls
  if (userQuery.isLoading || postQuery.isLoading || followerQuery.isLoading || followingQuery.isLoading) return (<div>Loading...</div>)
  return (
    <div className="flex flex-row mb-5">
      <div className="flex flex-col mr-4">
        <div className="left-[50px] font-bold text-2xl p-4">{userQuery.data?.username}'s Feed</div>
        {/* Different follow button based on if user is following the user's page or not */
        isFollowingQuery.data.at(0)? 
        <button className="text-bold mt-auto mb-1 w-100 rounded-md bg-[#58595B] p-2 text-lg text-white shadow-md duration-300 ease-in-out">
        Following
        </button>
        : <button 
        onClick={handleFollow}
        className="text-bold mt-auto mb-1 w-100 rounded-md bg-[#ff8200] p-2 text-lg text-white shadow-md duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#ff8200]/[0.9]"
        >
            Follow</button> }
      </div>
      <div className="flex flex-row mt-4">
        <div className="flex flex-col text-center mr-4 text-bold text-lg">
            <div>{numPosts}</div>
            <div>{posts}</div>
        </div>
        <div className="flex flex-col text-center mr-4 text-bold text-lg">
            <div>{followerQuery.data}</div>
            <div>Followers</div>
        </div>
        <div className="flex flex-col text-center text-bold text-lg">
            <div>{followingQuery.data}</div>
            <div>Following</div>
        </div>
      </div>
    </div>
  )
}

export default Profile;