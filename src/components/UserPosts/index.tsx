import { FunctionComponent, useState } from 'react';
import { api } from '../../utils/api'
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link"

const getTimeDifference = (datetime: Date): string => {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - datetime.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`
  } else {
    const diffInDays = Math.floor(diffInSeconds / 86400)

    if (diffInDays < 1) {
      const diffInHours = Math.floor(diffInSeconds / 3600)
      return `${diffInHours} hours ago`
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

const UserPosts: FunctionComponent = (username) => { 
    if (!username || username.userId === '') return (null);
    const usernameQuery = api.user.getUserByUsername.useQuery(username.userId);
    let userId = usernameQuery.data?.id;
    const postQuery = api.post.getUserPosts.useQuery(userId);

    const { data: sessionData } = useSession();
    const updatedPost = api.post.updatePost.useMutation();

    const unlikePost = api.post.unlikePost.useMutation();

    const comment = api.comment.createComment.useMutation();

    const [comments, setComments] = useState(Array(postQuery?.data?.length).fill(''));
    
    const handleLike = async (post : Post) => {

      const like={postId: post.id, userId: sessionData?.user?.id, likes: post.likes}
      
      const likes = post.likes

      // Check if the user already liked the post
      if (likes.includes(sessionData?.user?.id)) {
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
        {postQuery.data?.length < 1 ? <div>No Posts Yet.</div> : postQuery.data?.map((post, index) => {
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
  
                    <button className={ `flex cursor-pointer w-[50px] h-[50px] rounded border-[2px] ${post.likes.includes(sessionData?.user?.id)?"bg-[#3b3b3b] border-[#ff8200]": "bg-[#fff] border-[#000]"}`  } onClick={() => handleLike(post, index)}>
                      <Image src={`${post.likes.includes(sessionData?.user?.id)? "/liked_icon.svg": "/like_icon.svg"}`} width={100} height={100} className="px-[1px] h-[50px]  w-[50px]" alt="like button"/>
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
                      <Link href={`/explore/posts/${post.id}`}>View more comments...</Link>
                    </div>
                    : <span className="min-w-[250px]"></span>}
                                 
                  </div>
                                   
                <div className="h-0 my-4"></div>
              </div>
              <div className="h-0 my-6"></div>
            </article>
          )
        })}
      </div>
    )
}

export default UserPosts;