import {Link, useNavigate, useParams} from "react-router-dom"
import PostItem from "./PostItem";
import { getAllPost, getUserById } from "./api/UserApiService";
import { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  birthdate: string;
  gender: string;
}
interface Post {
  id: number;
  title: string;
  body: string;
  createAt: Date;
}

export default function HomePage() {
  const {userId} = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [postsFilter, setPostsFilter] = useState<Post[] | null>(null);
  const navigate = useNavigate();
  const goToAccount = () => {
    navigate(`/account/${userId}`);
  }
  const getUserInfo = async () => {
    if (userId !== undefined){
      const id = parseInt(userId);
      await getUserById(id).then((respone) => {
        setUser(respone.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
        setUser(null);
      })
    }
  };
  const getPosts = async () => {
    if (userId !== undefined){
      const id = parseInt(userId);
        await getAllPost(id)
          .then((response) => {
            const posts : Post[] = response.data;
            setPosts(posts);
            setPostsFilter(posts);
          })
          .catch((error) => {
            console.error("Error: ", error);
          })
    }
  }
  const searchPost = (e : React.ChangeEvent<HTMLInputElement>) => {
    const valueChanged = e.target.value
    if (valueChanged !== "") {
      const res : Post[] = posts?.filter((post) => (post.title.includes(valueChanged.toLowerCase().trim()))) || [];
      setPostsFilter(res);
    } else {
      setPostsFilter(posts);
    }
  }
  useEffect(() => {
    getUserInfo();
    getPosts();
  }, [userId]);
  return (
    <div className="w-full min-h-screen pt-20 pb-20 ">
        <div className="flex justify-between mx-16 items-center mt-4">
          <h1 className="font-mont text-lg">Hello {user?.name},</h1>
          <h2 className="font-mont underline hover:cursor-pointer text-md" onClick={goToAccount}>Manage your account</h2>
        </div>
        <input type="text" placeholder="Search your posts" onChange={(e) => searchPost(e)}className="mt-6 text-lg font-mont border-2 rounded-md p-2 border-[#914F1E] outline-none m-auto w-[40%] block"/>
        <h1 className="font-mont text-center mt-16 text-3xl font-semibold text-[#333]">Your Posts</h1>
        <div className="bg-[#fff] p-6">
          {
            postsFilter ? (
              postsFilter.map((post, index) => (
                <Link to={`/post/${post.id}`} key={index}>
                  <PostItem title={post.title} date={post.createAt.toString()}/>
                </Link>
              ))
            ) : (
                <h2 className="ont-mont text-center mt-16 text-xl font-medium text-[#333]">You don't have any posts.</h2>
              )
            }
        </div>
        <div className="">
          <Link to="/addpost">
            <button className=" p-4 bg-[#B5C18E] font-mont fixed bottom-12 right-16 rounded-md text-lg hover:shadow-xl text-[#914F1E] font-semibold">Add a new post</button>
          </Link>
        </div>
    </div>
  )
}
