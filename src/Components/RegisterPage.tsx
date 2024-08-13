import { useEffect, useState } from "react"
import { createNewUser, getAllUser } from "./api/AppApiService";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  birthdate: string;
  gender: string;
}

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkUsername() && password === passwordConfirm && password !== "" && username !== "") {
      await createNewUser(name.trim(), username.trim(), password, new Date(), "")
        .then(() => {
          alert("Regist success! Please login and add informations to your account.");
          navigate("/login");
        })
        .catch(error => console.error("Error: ", error));
    } else {
      if (!checkUsername()) {
        alert("Username is already existed, please choose another one!");
      }
      if (password !== passwordConfirm) {
        alert("Password confirm is wrong.");
      }
      if (password === "") {
        alert("Password is empty.");
      }
      if (username === "") {
        alert("Username is empty.");
      }
    }
  }
  const checkUsername = () => {
      if (users.find(user => user.username === username)) return false;
      return true;
  }
  const getUsers = async () => {
    await getAllUser()
      .then(response => {
        setUsers(response.data); 
      })
      .catch (error => {console.error("Error: ", error)});
  }
  useEffect(() => {
    getUsers();
  },[])
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-t from-[#B5C18E] to-white">
        <form action="submit" className="flex flex-col w-[25%] mt-[5%] m-auto p-10 shadow-lg rounded-md bg-[#fff]" onSubmit={e => createUser(e)}>
          <label htmlFor="inputName" className="font-mont text-lg text-[#914F1E] font-medium">Name</label>
          <input type="text" name="inputName" id="inputName" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} value={name} className="text-lg font-mont border-2 rounded-md p-2 border-[#B5C18E] outline-none mt-2"/>
          <label htmlFor="inputUsername" className="font-mont text-lg text-[#914F1E] font-medium mt-2">Username</label>
          <input type="text" name="username" id="inputUsername" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} value={username} className="text-lg font-mont border-2 rounded-md p-2 border-[#B5C18E] outline-none mt-2"/>
          <label htmlFor="inputPassword" className="font-mont text-lg text-[#914F1E] font-medium mt-2">Password</label>
          <input type="password" name="password" id="inputPassword" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value={password} className="text-lg font-mont border-2 rounded-md p-2 border-[#B5C18E] outline-none mt-2"/>
          <label htmlFor="inputConfirm" className="font-mont text-lg text-[#914F1E] font-medium mt-2">Confirm password</label>
          <input type="password" name="passwordConfirm" id="inputConfirm" placeholder="Confirm password" onChange={(e) => setpasswordConfirm(e.target.value)} value={passwordConfirm} className="text-lg font-mont border-2 rounded-md p-2 border-[#B5C18E] outline-none mt-2"/>
          <button className="py-2 bg-[#914F1E] mt-6 text-[#fff] font-mont font-medium rounded-md">Register</button>
        </form>
      </div>
  )
}
