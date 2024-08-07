import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "./security/AuthContext";

export default function LoginPage() {
  const authContext = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isLogin = await authContext?.login(username, pass); 
    if (isLogin) {
      navigate(`/home/${username}`);
    } else {
      alert("Invalid username or password");
      setUsername("");
      setPass("");
      navigate("/login");
    }
  }
  return (
      <div className="pt-20 min-h-screen bg-gradient-to-t from-[#B5C18E] to-white">
        <form action="submit" className="flex flex-col w-[25%] m-auto mt-[10%] p-10 shadow-lg rounded-md bg-[#fff]" onSubmit={handleSubmit}>
          <label htmlFor="inputUsername" className="font-mont text-xl text-[#914F1E] font-medium">Username</label>
          <input type="text" name="username" id="inputUsername" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} value={username} className="text-lg font-mont border-2 rounded-md p-2 border-[#B5C18E] outline-none mt-2"/>
          <label htmlFor="inputPassword" className="font-mont text-xl text-[#914F1E] font-medium mt-2">Password</label>
          <input type="password" name="password" id="inputPassword" placeholder="Enter password" onChange={(e) => setPass(e.target.value)} value={pass} className="text-lg font-mont border-2 rounded-md p-2 border-[#B5C18E] outline-none mt-2"/>
          <button className="py-2 bg-[#914F1E] mt-4 text-[#fff] font-mont font-medium rounded-md">Login</button>
        </form>
      </div>
    )
  }