import { FunctionComponent } from 'react';
import { api } from '../../utils/api'
import Image from "next/image";

const Posts: FunctionComponent = (mode) => { 
    // get all/following/my posts depending on mode
    const date: Date = new Date();
    let dateString = ""
    //const postQuery = api.post.getByUser.useQuery("test");

    const postQuery = 
      (mode.mode === "all") ?  api.post.getAllPosts.useQuery("") 
    : (mode.mode === "following") ? api.post.getFollowingPosts.useQuery("")
    : api.post.getMyPosts.useQuery("");

    if (postQuery.isLoading) {
      return <p>Loading...</p>
    }
  return (
    <div>
      {postQuery.data?.map((post) => {
        const date = post.createdAt

        dateString = date.toString();
        ///const nameString = api.user.getUserByID.useQuery(post.authorId)
        const nameString = post.authorUsername;
        const numLikes = post.likes
        const tempString = numLikes?.toString()
        const likeString = tempString + " likes"

        // store todays datetime to compare
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // check for timezone of post, remove it 
        // and adjust based on timezone the user is in currently
        const dateWithoutTimezone = new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000));
        dateString = dateWithoutTimezone.toISOString().replace(/\.\d{3}Z$/, "");

        // if the date of post is not today
        if (date < today) {
          // Date is not today, so remove the time so it only prints the date
          const dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
          dateString = dateWithoutTime.toDateString();
        }
        
        // visualization should go in between post title and content
        // profile pic at the top left of the username
        return (
          <article key={post.id}>
            <div className="h-full w-96 overflow-y-auto border-2 border-[#ff8200] bg-[#ededed] px-5 py-1">
              <p className="font-semibold">{nameString}</p>
              <p className="text-3xl">{post.title}</p>
              <p>{post.content}</p>
              <p className="text-right text-xs">{dateString}</p>
              <p className= "text-right text-xs text-[#ff8200] font-bold">{likeString}</p>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default Posts;