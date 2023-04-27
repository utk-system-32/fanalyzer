import { FunctionComponent } from 'react';
import { api } from '../../utils/api'
import Image from "next/image";

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
          // handle datetime
          const date = post.createdAt
          const dateString = getTimeDifference(date)
  
          // handle username and number of likes
          //const LikeArray = post.likes
          //const numLikes = LikeArray.length
          const numLikes = 0
          const tempString = numLikes?.toString()
          const likeString = tempString + " likes"
  
          // visualization should go in between post title and content
          // profile pic at the top left of the username
          return (
            <article key={post.id}>
              <div className="h-full w-[720px] overflow-y-auto border-2 rounded-2xl hover:border-2 hover:border-solid hover:border-[#000000]">
                <div className='bg-[#ff8200] rounded-t-xl w-full'>
                  <div className='flex h-[40px] py-2 px-2'>
                    <Image
                      src={post.author.image.startsWith("https") ? post.author.image : `data:image/png;base64,${post.author.image}`}
                      width={30}
                      height={30}
                      className="h-[30px]  w-[30px] rounded-full"
                      alt={`${post.author.username}'s profile picture`}
                    />
                    <p className="px-2 font-semibold text-xl text-[#fff]">{post.author.username}</p>
                  </div>
                  <p className="text-[#fff] text-3xl text-center py-1">{post.title}</p>
                </div>
                <Image
                  src={post.visualization ? `data:image/svg+xml;base64,${Buffer.from(post.visualization).toString('base64')}` : "/scatter-plot-example-1.png"}
                  width={293}
                  height={498}
                  className="h-[400px]  w-[650px]"
                />
                <p className='px-4'>{post.content}</p>
                <p className="text-right text-xs px-4">{dateString}</p>
                <div className="flex space-x-[574px] px-4">
                  <button className="flex cursor-pointer w-[58px] rounded border-[1px] border-[#000]">
                    <Image
                      src="/like_icon.png"
                      width={100}
                      height={100}
                      className="px-[1px] h-[24px]  w-[24px]"
                    />
                    <p className="text">{"Like"}</p>
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

export default UserPosts;