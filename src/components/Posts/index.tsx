import { FunctionComponent, useState } from 'react';
import { api } from '../../utils/api'
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Post } from '@prisma/client';
import Link from "next/link"

// this function calculates the difference between right now and
// and the time of the post and returns a string
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

const Posts: FunctionComponent = (mode) => { 
    // get all/following/my posts depending on mode
    const date: Date = new Date();
    let dateString = ""

    const { data: sessionData } = useSession();
    const userQuery = api.user.getUserByID.useQuery(sessionData?.user?.id);
    let userId = sessionData?.user?.id;

    const postQuery = 
      (mode.mode === "all") ?  api.post.getAllPosts.useQuery("") 
    : (mode.mode === "following") ? api.post.getFollowingPosts.useQuery("")
    : (mode.mode === "my") ? api.post.getMyPosts.useQuery("")
    : api.post.getSearchPosts.useQuery(mode.mode)

    const updatedPost = api.post.updatePost.useMutation();


    const handleLike = async (post : Post) => {

      const like={postId: post.id, userId: sessionData?.user?.id}
      
      const likes = post.likes

      // Check if the user already liked the post
      if (likes.includes(userId)) {
        return;
      }

      updatedPost.mutate(like)

      // Refetch data to update the UI
      postQuery.refetch();
    };

    if (postQuery.isLoading) {
      return <Image src="/loading.gif" width={30} height={30} alt="Loading..."/>
    }

  return (
    <div>
      {postQuery.data?.map((post) => {
        // handle datetime
        const date = post.createdAt
        const dateString = getTimeDifference(date)

        // handle username and number of likes
        const numLikes = post.likes.length
        const tempString = numLikes?.toString()
        const likeString = tempString + " likes"

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
                <p className="text-[#fff] text-3xl text-center py-2">{post.title}</p>
              </div>
              <div className="flex justify-center">
                <Image
                  src={post.visualization ? `data:image/svg+xml;base64,${Buffer.from(post.visualization).toString('base64')}` : "/scatter-plot-example-1.png"}
                  width={293}
                  height={498}
                  className="h-[400px]  w-[400px]"
                />
              </div>
              <p className='px-4'>{post.content}</p>
              <div className='border-b border-[1px] my-4'></div>
                <p className="text-right text-s px-8 font-bold">{dateString}</p>
              <div className="flex space-x-[574px] px-4">
                <button className={ `flex cursor-pointer w-[50px] h-[50px] rounded border-[2px] ${post.likes.includes(userId)?"bg-[#3b3b3b] border-[#ff8200]": "bg-[#fff] border-[#000]"}`  } onClick={() => handleLike(post)}>
                  <Image src={`${post.likes.includes(userId)? "/liked_icon.svg": "/like_icon.svg"}`} width={100} height={100} className="px-[1px] h-[50px]  w-[50px]"/>
                </button>
                <p className= "text-right text-[#ff8200] font-bold">{likeString}</p>
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

export default Posts;