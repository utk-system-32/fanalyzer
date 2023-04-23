import { api } from '../../utils/api'
import { FunctionComponent, useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface Props {
  popupOpen: boolean;
  setPopupOpen: (popupOpen: boolean) => void;
}

interface Post {
  visualization: string;
  title: string;
  content: string;
}

const CreatePost: FunctionComponent<Props> = ({ popupOpen, setPopupOpen }) => {
  const { data: sessionData } = useSession();

  //const[popupOpen, setPopupOpen] = useState(true);
  const[error, setError] = useState("");
  const[visError, setVisError] = useState("");

  const [post, setPost] = useState<Post>({
    visualization: '',
    title: '',
    content: ''
  });
  const router = useRouter();

  const visualizationQuery = api.visualization.getUserVisualizations.useQuery("");
  const createPostMutation = api.post.createPost.useMutation();

  const handleCreatePost = () => {
    if (post.title === '') {
      setError("Title is required.");
      if (post.visualization === '') setVisError("Visualization is required.")
    }
    else if (post.visualization === '') setVisError("Visualization is required.")
    else {
      createPostMutation.mutate(post);
      router.push("/feed");
    }
  }

  return (
    <div>
      {popupOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="flex min-h-[500px] w-full min-w-[600px] flex-col rounded-md bg-white p-5 shadow-lg">
            <div className="absolute top-5 right-8 cursor-pointer font-bold text-xl" onClick={() => setPopupOpen(false)}>X</div>
              <div className="flex flex-col">
                <h1 className="text-2xl mb-5">Create a Post</h1>
                <label htmlFor="visualization-select" className="mb-2">Select a visualization:</label>
                  <select 
                    id="visualization-select"
                    className={`p-2 border ${visError ? "border-red-600" : "border-black"} rounded-md`}
                    value={post.visualization}
                    onChange={(e) => {
                      setPost({ ...post, visualization: e.target.value })
                      setVisError('')
                    }
                    }
                  >
                    <option value="">Select a visualization...</option>
                    {visualizationQuery.data?.map((vis: any) => (
                      <option key={vis.id} value={vis.data}>
                        {vis.name}
                      </option>
                    ))}
                  </select>
                  {visError && <div className="text-red-600">{visError}</div>}
                {post.visualization ? 
                <Image 
                src={`data:image/svg+xml;base64,${Buffer.from(post.visualization).toString('base64')}`} 
                alt="My SVG" 
                width={200} 
                height={200} /> : <div></div>}
                <input
                  className={`p-2 mt-5 border ${error ? "border-red-600" : "border-black"} rounded-md`}
                  type="text"
                  placeholder="Post title"
                  value={post.title}
                  onChange={(e) => {
                    setPost({ ...post, title: e.target.value })
                    setError('')
                  }
                  }
                />
                {error && <div className="text-red-600">{error}</div>}
                <textarea
                  className="mb-5 mt-5 p-2 border border-black rounded-md max-h-[150px] min-h-[50px]"
                  placeholder="Post content"
                  value={post.content}
                  onChange={(e) =>
                    setPost({ ...post, content: e.target.value })
                  }
                />
                <button
                  onClick={handleCreatePost}
                  className="text-bold mt-auto mb-1 self-center w-full rounded-md bg-[#ff8200] p-5 text-lg text-white shadow-md duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#ff8200]/[0.9]"
                >
                  Create Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );  
}

export default CreatePost;