import {Link} from "react-router-dom"
import PostItem from "./PostItem";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen pt-20 pb-20 ">
        <div className="flex justify-between mx-16 items-center mt-4">
          <h1 className="font-mont text-lg">Hello Name,</h1>
          <Link to="/account">
            <h2 className="font-mont underline hover:cursor-pointer text-md">Manage your account</h2>
          </Link>
        </div>
        <input type="text" placeholder="Search your posts" className="mt-6 text-lg font-mont border-2 rounded-md p-2 border-[#914F1E] outline-none m-auto w-[40%] block"/>
        <h1 className="font-mont text-center mt-16 text-3xl font-semibold text-[#333]">Your Posts</h1>
        <div className="bg-[#fff] p-6">
          <Link to="/post">
            <PostItem />
          </Link>
        </div>
        <div className="">
          <Link to="/addpost">
            <button className=" p-4 bg-[#B5C18E] font-mont fixed bottom-12 right-16 rounded-md text-lg hover:shadow-xl text-[#914F1E] font-semibold">Add a new post</button>
          </Link>
        </div>
    </div>
  )
}
