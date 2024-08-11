import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "./security/AuthContext";
import { useEffect, useRef, useState } from "react";
import { getAllPost } from "./api/AppApiService";

interface Post {
  id: number;
  title: string;
  body: string;
  createAt: Date;
}
export default function PostPage() {
  const [post, setPost] = useState<Post | undefined>(undefined);
  const {postId} = useParams();
  const navigate = useNavigate();
  const authContext = useAuth();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const goToHome = () => {
    navigate(`/home/${authContext?.userId}`);
  };
  const getPost = async() => {
    if (authContext?.userId !== undefined){
      await getAllPost(authContext.userId)
        .then((respone) => {
          const posts : Post[] = respone.data;
          setPost(posts.find(post => post.id === parseInt(postId ?? "")));
        })
        .catch(error => {console.error(error)});
    }
  };
  useEffect(() => {
    getPost();
  },[post]);
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to calculate the correct height
      textareaRef.current.style.height = "auto";
      // Set height based on scrollHeight
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [post?.body]);
  return (
    <div className="w-full min-h-screen pt-20 pb-20 bg-gradient-to-t from-[#B5C18E] to-white">
        <h2 className="ml-16 font-mont text-lg font-medium hover:cursor-pointer underline" onClick={goToHome}>Back to home</h2>
        <div className="w-[80%] min-h-[500px] m-auto p-10 bg-[#fff] rounded-md mt-20 shadow-sm">
            <h1 className="font-mont text-xl outline-none w-full font-medium" style={{ whiteSpace: 'pre-line' }}>{post?.title}</h1>
            <div className="h-[1px] bg-[#333]"></div>
            <textarea ref={textareaRef} className="w-full text-lg mt-2 outline-none font-mont min-h-[400px]" readOnly value={post?.body} /> 
        </div>
    </div>
  )
}
