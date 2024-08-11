import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllPost, updatePostById } from "./api/AppApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useRef, useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
  createAt: Date;
}

export default function UpdatePostPage() {
  const navigate = useNavigate();
  const authContext = useAuth();
  const {postId} = useParams();
  const userId = authContext?.userId;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [post, setPost] = useState<Post | null>(null);
  const savePost = async (event : React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (post?.title === "" || post?.body === "") {
      alert("The title or content of the post is empty.");
      return;
    }
    if (userId !== undefined && postId !== undefined && post !== null) {
      updatePostById(userId, parseInt(postId), post)
        .then(() => {
          navigate(`/post/${postId}`);
        })
        .catch(error => console.error("Error: ", error));
    }
  }
  const cancelUpdate = (event : React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (confirm("Your changes will not be saved.")) {
      navigate(`/post/${postId}`);  
    }
  }
  const getPost = async () => {
    if (userId !== undefined && postId !== undefined) {
      await getAllPost(userId)
        .then(response => {
          const posts : Post[] = response.data;
          const parsePostId = parseInt(postId);
          setPost(posts.find((post) => post.id === parsePostId) || null);
        })
        .catch(error => console.log(error));
    }
  }
  const changeInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setPost(prevState => {
      if (prevState) {
        return {
          ...prevState,
          [name] : value,
        };
      } else {
        return null;
      }
    });
  }
  useEffect(() => {getPost()}, []);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  })
  return (
    <div className="w-full min-h-[screen] pt-20 pb-20 bg-gradient-to-t from-[#B5C18E] to-white">
        <Link to={`/home/${userId}`}>
          <h2 className="ml-16 font-mont text-lg font-medium underline">Back to home</h2>
        </Link>
        <form className="w-[80%] min-h-[500px] m-auto p-10 bg-[#fff] rounded-md mt-20 shadow-sm">
            <input type="text" placeholder="Title" name="title" onChange={(e) => changeInput(e)} value={post?.title} className="font-mont text-xl outline-none w-full font-medium"/>
            <div className="h-[1px] bg-[#333]"></div>
            <textarea name="body" ref={textareaRef} onChange={(e) => changeInput(e)} value={post?.body} className="w-full min-h-[400px] text-lg mt-2 outline-none font-mont" />
            <button className="py-2 px-4 bg-[#914F1E] mt-4 text-[#fff] font-mont font-semibold rounded-md" onClick={(e) => savePost(e)}>Save</button>
            <button className="py-2 px-4 bg-[#B5C18E] mt-4 text-[#333] font-mont font-semibold rounded-md ml-2" onClick={(e) => cancelUpdate(e)}>Cancel</button>
        </form>
    </div>
  )
}
