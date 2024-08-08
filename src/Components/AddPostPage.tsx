import { Link } from "react-router-dom";


export default function AddPostPage() {
  
  return (
    <div className="w-full min-h-screen pt-20 pb-20 bg-gradient-to-t from-[#B5C18E] to-white">
        <Link to={`/home/`}>
          <h2 className="ml-16 font-mont text-lg font-medium underline">Back to home</h2>
        </Link>
        <div className="w-[80%] min-h-screen m-auto p-10 bg-[#fff] rounded-md mt-20 shadow-sm">
            <input type="text" placeholder="Title" className="font-mont text-xl outline-none w-full font-medium"/>
            <div className="h-[1px] bg-[#333]"></div>
            <textarea name="content" id="" className="w-full min-h-screen text-lg mt-2 outline-none font-mont" />
            <button className="py-2 px-4 bg-[#914F1E] mt-4 text-[#fff] font-mont font-semibold rounded-md">Save</button>
            <button className="py-2 px-4 bg-[#B5C18E] mt-4 text-[#333] font-mont font-semibold rounded-md ml-2">Cancel</button>
        </div>
    </div>
  )
}
