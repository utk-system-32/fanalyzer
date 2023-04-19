import { FunctionComponent } from 'react';
import { api } from '../../utils/api'
import Image from "next/image";

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
    //const postQuery = api.post.getByUser.useQuery("test");

    const postQuery = 
      (mode.mode === "all") ?  api.post.getAllPosts.useQuery("") 
    : (mode.mode === "following") ? api.post.getFollowingPosts.useQuery("")
    : (mode.mode === "my") ? api.post.getMyPosts.useQuery("")
    : api.post.getSearchPosts.useQuery(mode.mode)

    if (postQuery.isLoading) {
      return <p>Loading...</p>
    }
  return (
    <div>
      {postQuery.data?.map((post) => {
        // handle datetime
        const date = post.createdAt
        const dateString = getTimeDifference(date)

        // handle username and number of likes
        const nameString = post.authorUsername;
        //const LikeArray = post.likes
        //const numLikes = LikeArray.length
        const numLikes = 0
        const tempString = numLikes?.toString()
        const likeString = tempString + " likes"

        // visualization should go in between post title and content
        // profile pic at the top left of the username
        return (
          <article key={post.id}>
            <div className="h-full w-[720px] overflow-y-auto border-2 rounded hover:border-2 hover:border-solid hover:border-[#ff8200] px-5 py-1">
              <p className="font-semibold text-xl">{nameString}</p>
              <p className="underline text-3xl text-center">{post.title}</p>
              <Image
                src="/scatter-plot-example-1.png"
                width={293}
                height={498}
                className="h-[400px]  w-[650px]"
              />
              <p>{post.content}</p>
              <p className="text-right text-xs">{dateString}</p>
              <div className="flex space-x-[584px]">
                <button className="flex cursor-pointer rounded border-[1px] border-[#000] px-1">
                  <Image
                    src="/like_icon.png"
                    width={100}
                    height={100}
                    className="ml-auto h-[16px]  w-[16px]"
                  />
                  <p className="text-xs">{"Like"}</p>
                </button>
                <p className= "text-right text-xs text-[#ff8200] font-bold">{likeString}</p>
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