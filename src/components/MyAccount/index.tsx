import { api } from '../../utils/api'
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"

function MyAccount() {
  const router = useRouter();

  const { data: sessionData } = useSession();

  const [showPopup, setShowPopup] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
        setShowPopup1(false);
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const [hovered, setHovered] = useState(false);
  // get userId from username
  const userQuery = api.user.getUserByID.useQuery(sessionData?.user?.id);
  let userId = sessionData?.user?.id;

  // variable to display # of posts by user
  const postQuery = api.post.getUserPosts.useQuery(userId);
  const numPosts = postQuery.data?.length;
  let posts;
  numPosts == 1 ? posts = "Post" : posts = "Posts"

  // variables to display # of user's followers/following 
  const followerQuery = api.user.getUserFollowers.useQuery(userId);
  const followingQuery = api.user.getUserFollowing.useQuery(userId);

  // display loading while fetching API calls
  if (userQuery.isLoading || postQuery.isLoading || followerQuery.isLoading || followingQuery.isLoading) return (<div></div>)
  return (
    <div className="flex flex-row mb-5">
      <div className="flex flex-col mr-4">
        <div className="flex flex-row mb-4">
            <Image
                src={userQuery.data?.image?.startsWith("https") ? userQuery.data?.image : `data:image/png;base64,${userQuery.data?.image}`}
                width={75}
                height={75}
                className="h-[75px]  w-[75px]"
                alt="Upload profile picture"
            />
            <div className="left-[50px] font-bold text-2xl p-4">{userQuery.data?.username}'s Feed</div>
        </div>
        <Link
        href="/dashboard/my-account/edit"
        className="text-bold text-center mt-auto mb-1 w-100 rounded-md bg-[#58595B] p-2 text-lg text-white shadow-md duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#58595B]/[0.9]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        >
        Edit Profile
        </Link>
      </div>
      <div className="flex flex-row mt-4">
        <div className="flex flex-col text-center mr-4 text-lg">
            <div className="font-bold">{numPosts}</div>
            <div>{posts}</div>
        </div>
        <div className="relative">
          <div className="flex flex-col text-center mr-4  text-lg">
              <button onClick={() => setShowPopup(!showPopup)} className="font-bold">{followerQuery.data.length}</button>
              <div>{followerQuery.data.length === 1 ? "Follower" : "Followers"}</div>
          </div>
          {showPopup && (
            <div ref={popupRef} className="absolute -right-6 bg-white border border-gray-300 rounded-lg shadow-md p-6 mt-1 text-sm">
              {followerQuery.data.map((item) => (
                <div key={item.id} className="mb-1 mr-4">
                  <button className="flex flex-row" onMouseDown={() => {setShowPopup(false); router.push(`/explore/${item.username}`)}}>
                    <Image
                      src={item.image?.startsWith("https") ? item.image : `data:image/png;base64,${item.image}`}
                      width={20}
                      height={20}
                      className="h-[20px]  w-[20px] mr-2 rounded-full"
                      alt={`${item.username}'s profile picture`}
                    />
                    {item.username}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <div className="flex flex-col text-center text-lg">
              <button onClick={() => setShowPopup1(!showPopup1)} className="font-bold">{followingQuery.data.length}</button>
              <div>Following</div>
          </div>
          {showPopup1 && (
            <div ref={popupRef} className="absolute -right-12 bg-white border border-gray-300 rounded-lg shadow-md p-6 mt-1 text-sm">
              {followingQuery.data.map((item) => (
                <div key={item.id} className="mb-1 mr-4">
                  <button className="flex flex-row" onMouseDown={() => {setShowPopup1(false); router.push(`/explore/${item.username}`)}}>
                    <Image
                      src={item.image?.startsWith("https") ? item.image : `data:image/png;base64,${item.image}`}
                      width={20}
                      height={20}
                      className="h-[20px]  w-[20px] mr-2 rounded-full"
                      alt={`${item.username}'s profile picture`}
                    />
                    {item.username}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyAccount;