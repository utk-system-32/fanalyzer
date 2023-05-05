import { FunctionComponent, useState, useEffect, useRef } from 'react';
import { api } from '../../utils/api'
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Post } from '@prisma/client';
import Link from "next/link"
import DeletePost from "src/components/DeletePost";

// this function calculates the difference between right now and
// and the time of the post and returns a string
const getTimeDifference = (datetime: Date): string => {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - datetime.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return diffInSeconds === 1 ? `${diffInSeconds} second ago` : `${diffInSeconds} seconds ago`
  } else {
    const diffInDays = Math.floor(diffInSeconds / 86400)

    if (diffInDays < 1) {
      const diffInHours = Math.floor(diffInSeconds / 3600)
      const diffInMinutes = Math.floor((diffInSeconds % 3600) / 60)
      if (diffInHours === 1) {
        return `${diffInHours} hour ago`
      } else if (diffInHours > 1) {
        return `${diffInHours} hours ago`
      } else if (diffInMinutes === 1) {
        return `${diffInMinutes} minute ago`
      } else {
        return `${diffInMinutes} minutes ago`
      }
    } else if (diffInDays === 1) {
      return '1 day ago'
    } else if (diffInDays < 30) {
      return `${diffInDays} days ago`
    } else {
      const month = datetime.toLocaleString('default', { month: 'short' })
      const day = datetime.getDate()
      const year = datetime.getFullYear()
      return `${month} ${day}, ${year}`
    }
  }
}


const Posts: FunctionComponent = (mode) => { 
    // get all/following/my posts depending on mode
    const date: Date = new Date();
    let dateString = ""

    const { data: sessionData } = useSession();
    let userId = sessionData?.user?.id;

    const postQuery = 
      (mode.mode === "all") ?  api.post.getAllPosts.useQuery("") 
    : (mode.mode === "following") ? api.post.getFollowingPosts.useQuery("")
    : (mode.mode === "my") ? api.post.getMyPosts.useQuery("")
    : api.post.getSearchPosts.useQuery(mode.mode)

    const updatedPost = api.post.updatePost.useMutation();

    const unlikePost = api.post.unlikePost.useMutation();

    const comment = api.comment.createComment.useMutation();

    const [delIcon, setDelIcon] = useState("/delete.svg")
    const [deletePopup, setDeletePopup] = useState(false);
    const [deletePostId, setDeletePostId] = useState("");

    const [comments, setComments] = useState(Array(postQuery?.data?.length).fill(''));

    const handleLike = async (post : Post) => {

      const like={postId: post.id, userId: sessionData?.user?.id, likes: post.likes}
      
      const likes = post.likes

      // Check if the user already liked the post
      if (likes.includes(userId)) {
        await unlikePost.mutateAsync(like);
      }
      else {
        await updatedPost.mutateAsync(like);
      }

      // Refetch data to update the UI
      postQuery.refetch();
    };

    const handleComment = async (index) => {
      const comm = {postId: postQuery.data?.at(index)?.id, comment: comments[index]}
      await comment.mutateAsync(comm)
      postQuery.refetch();
    }

    if (postQuery.isLoading) {
      return <Image src="/loading.gif" width={30} height={30} alt="Loading..."/>
    }

  return (
    <div>
      {deletePopup ? <DeletePost popupOpen={deletePopup} setPopupOpen={setDeletePopup} postId={deletePostId}/> : null}
      {postQuery.data?.length < 1 ? <div>No Posts Found.</div> : postQuery.data?.map((post, index) => {
        // handle datetime
        const date = post.createdAt
        const dateString = getTimeDifference(date)

        // handle username and number of likes
        const numLikes = post.likes.length
        const tempString = numLikes?.toString()
        const likeString = tempString + (numLikes === 1 ? " like" : " likes")

        // visualization should go in between post title and content
        // profile pic at the top left of the username
        return (
          <article key={post.id}>
            <div className="h-full w-[720px] overflow-y-auto border-2 mt-4 rounded-2xl hover:border-2 hover:border-solid hover:border-[#000000]">
              <div className='bg-[#ff8200] rounded-t-xl w-full'>
                <div className='flex h-[40px] py-2 px-2'>
                  <Link href={`/explore/${post.author.username}`} className="flex flex-row">
                  <Image
                    src={post.author.image.startsWith("https") ? post.author.image : `data:image/png;base64,${post.author.image}`}
                    width={30}
                    height={30}
                    className="h-[30px]  w-[30px] rounded-full"
                    alt={`${post.author.username}'s profile picture`}
                  />
                  <div className="px-2 font-semibold text-xl text-[#fff]">{post.author.username}
                  </div>
                  </Link>
                </div>
                <Link href={`/explore/posts/${post.id}`}><p className="text-[#fff] text-3xl text-center py-2">{post.title}</p></Link>
              </div>
              <div className="flex justify-center">
                <Image
                  src={post.visualization ? `data:image/svg+xml;base64,${Buffer.from(post.visualization).toString('base64')}` : "/scatter-plot-example-1.png"}
                  width={293}
                  height={498}
                  alt="Visualization"
                  className="h-[400px]  w-[400px]"
                />
              </div>
              <p className='px-14'>{post.content}</p>
              <div className="flex flex-row px-6 mt-5">
                
                <div className="flex flex-col px-8">
                <p className=" text-s font-bold mb-2">{dateString}</p>

                  <button className={ `flex cursor-pointer w-[50px] h-[50px] rounded border-[2px] ${post.likes.includes(userId)?"bg-[#3b3b3b] border-[#ff8200]": "bg-[#fff] border-[#000]"}`  } onClick={() => handleLike(post, index)}>
                    <Image src={`${post.likes.includes(userId)? "/liked_icon.svg": "/like_icon.svg"}`} width={100} height={100} className="px-[1px] h-[50px]  w-[50px]" alt="like button"/>
                  </button>
                  <p className= " text-[#ff8200] font-bold">{likeString}</p>
                </div>
              
                
                <textarea
                  className="mt-5 h-8 max-h-[75px] border-b border-gray-400 focus:border-blue-500 focus:outline-none pb-2"
                  placeholder="Add a comment..."
                  onChange={(e) => {
                    comments[index] = e.target.value;
                    setComments(comments);
                  }}
                />

                  <button
                    onClick={() => handleComment(index)}
                    className="text-bold mb-10 self-center rounded-md  p-5 text-lg text-[#ff8200] "
                  >
                    Post
                  </button>
                  {post.comments[0] ?
                  <div className="mx-5">
                    <p className="font-bold mb-2">Comments</p>
                    <div className="flex flex-row">
                      <Image
                        src={post.comments?.at(0)?.author.image.startsWith("https") ? post.comments?.at(0)?.author.image : `data:image/png;base64,${post.comments?.at(0)?.author.image}`}
                        width={30}
                        height={30}
                        className="h-[30px]  w-[30px] rounded-full mr-2"
                        alt={`${post.comments?.at(0)?.author.username}'s profile picture`}
                      />
                      <div className="flex flex-col">
                        <div className="flex flex-row">
                        <Link href={`/explore/${post.comments?.at(0)?.author.username}`} className="flex flex-row mr-4 font-bold">
                          {post.comments?.at(0)?.author.username}
                        </Link>
                        {post.comments[0] ? getTimeDifference(post.comments[0]?.createdAt) : null}
                        </div>
                        {post.comments?.at(0)?.comment}
                      </div>
                    </div>
                    {post.comments?.length > 1 ? <Link href={`/explore/posts/${post.id}`}>View more comments...</Link> : null}
                  </div>
                  : <span className="min-w-[250px]"></span>}
                               
                </div>
                {mode.mode === "my" ? 
                  <button 
                    className="float-right flex flex-row mr-20 mt-5 mb-2 hover:text-red-600" 
                    onMouseOver={() => setDelIcon("/delete_red.svg")} 
                    onMouseOut={() => setDelIcon("/delete.svg")} 
                    onClick={() => { if (userId === post.authorId) {setDeletePopup(true); setDeletePostId(post.id)}}}>
                    <Image
                      src={delIcon}
                      width={25}
                      height={25}
                      alt="Delete image"
                      className="h-[25px]  w-[25px]"
                    />
                    Delete Post
                  </button>
                  : null}
                
              <div className="h-0 my-4"></div>
            </div>
            <div className="h-0 my-6"></div>
          </article>
        )
      })}
    </div>
  )
}

export default Posts;