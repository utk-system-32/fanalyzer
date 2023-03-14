import { api } from '../../utils/api'
import { FunctionComponent, useState } from 'react';
import { useRouter } from "next/router";

interface Post {
  title: string;
  content: string;
}

const CreatePost: FunctionComponent = () => {
  const [post, setPost] = useState<Post>({
    title: '',
    content: ''
  });
  const router = useRouter();

  const createPostMutation = api.post.createPost.useMutation();

  const handleCreatePost = () => {
    createPostMutation.mutate(post);
    router.push("/feed");
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl mb-5">Create a Post</h1>
      <input
        className="mb-5"
        type="text"
        placeholder="Post title"
        value={post.title}
        onChange={(e) => setPost({...post, title: e.target.value})}
      />
      <textarea
        className="mb-5"
        placeholder="Post content"
        value={post.content}
        onChange={(e) => setPost({...post, content: e.target.value})}
      />
      <button 
      onClick={handleCreatePost}
      className="text-bold mt-auto mb-1 self-center w-100 rounded-md bg-[#ff8200] p-5 text-lg text-white shadow-md duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#ff8200]/[0.9]"
      >
        Create Post</button>
    </div>
  )
}

export default CreatePost;



