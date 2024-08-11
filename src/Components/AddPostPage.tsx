import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { sendPost } from "./api/AppApiService";


export default function AddPostPage() {
  const {userId} = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const savePost = async (event : React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if ((title === "") || (content === "")) {
      alert("The title or content of the post is empty.")
    } else {
      if (userId !== undefined) {
        await sendPost(parseInt(userId), title, content, new Date())
          .then(() => {
            navigate(`/home/${userId}`);
          })
          .catch((error) => {console.error("Error: ", error)});
      }
    }
  }
  const clearPost = (event : React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTitle("");
    setContent("");
  }
  return (
    <div className="w-full min-h-screen pt-20 pb-20 bg-gradient-to-t from-[#B5C18E] to-white">
        <Link to={`/home/${userId}`}>
          <h2 className="ml-16 font-mont text-lg font-medium underline">Back to home</h2>
        </Link>
        <form className="w-[80%] min-h-screen m-auto p-10 bg-[#fff] rounded-md mt-20 shadow-sm">
            <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} className="font-mont text-xl outline-none w-full font-medium"/>
            <div className="h-[1px] bg-[#333]"></div>
            <textarea name="content" onChange={(e) => setContent(e.target.value)} value={content} className="w-full min-h-screen text-lg mt-2 outline-none font-mont" />
            <button className="py-2 px-4 bg-[#914F1E] mt-4 text-[#fff] font-mont font-semibold rounded-md" onClick={(e) => savePost(e)}>Save</button>
            <button className="py-2 px-4 bg-[#B5C18E] mt-4 text-[#333] font-mont font-semibold rounded-md ml-2" onClick={(e) => clearPost(e)}>Clear</button>
        </form>
    </div>
  )
}
