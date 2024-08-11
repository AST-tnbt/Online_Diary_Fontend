import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUserById } from "./api/AppApiService";
import { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  birthdate: string;
  gender: string;
}

export default function AccountPage() {
  const {userId} = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [userUpdate, setUserUpdate] = useState<User | null>(null);
  const [updateInfo, setUpdateInfo] = useState(false);
  const goToHome = () => {
    navigate(`/home/${userId}`);
  }
  const getUserInfo = () => {
    if (userId !== undefined){
      const id = parseInt(userId);
      getUserById(id).then((respone) => {
        setUser(respone.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
        setUser(null);
      })
    }
  };
  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserUpdate((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          [name]: value,
        };
      } else {
        return null;
      }
    });
  };
  const saveInfo = async () => {
    if (userUpdate?.id !== undefined) {
      await updateUserById(userUpdate?.id, userUpdate)
        .then(() => setUpdateInfo(false))
        .catch(error => {console.error(error); alert("Error, please check your input again.")});
    }
  }
  useEffect(() => {
    getUserInfo();
  });
  return (
    <div className='w-full min-h-screen pt-20 pb-20 bg-gradient-to-t from-[#B5C18E] to-white '>
        <h2 className="ml-16 font-mont text-lg font-medium hover:cursor-pointer underline" onClick={goToHome}>Back to home</h2>
        <div className="m-auto w-[30%] mt-[10%] shadow-lg rounded-md p-10 space-y-2 bg-[#fff] relative">
          {
            !updateInfo ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute right-4 top-4 hover:cursor-pointer" onClick={() => {setUserUpdate(user); setUpdateInfo(true);}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            ) : null
          }
          {
          !updateInfo ? 
          <div>
            <h3 className="font-mont text-3xl font-semibold">{user?.name}</h3>
            <div className="font-mont text-lg flex space-x-2">
                <h3>Gender:</h3>
                <h3>{user?.gender}</h3>
            </div>
            <div className="font-mont text-lg flex space-x-2">
                <h3>Day of birth:</h3>
                <h3>{user?.birthdate}</h3>
            </div>
          </div> :
          <form className="space-y-4">
            <input type="text" className="font-mont text-3xl font-semibold outline-none border-2 rounded-md w-full" name="name" value={userUpdate?.name} onChange={e => changeInput(e)}/>
            <div className="font-mont text-lg flex space-x-2 w-full ">
                <h3>Gender:</h3>
                <input className="outline-none border-2 rounded-md w-full" type="text" value={userUpdate?.gender} name="gender" onChange={e => {changeInput(e)}}/>
            </div>
            <div className="font-mont text-lg flex space-x-2 w-full">
                <h3>DoB:</h3>
                <input className="outline-none border-2 rounded-md w-full" type="text" value={userUpdate?.birthdate} name="birthdate" onChange={e => {changeInput(e)}}/>
            </div>
            <div className="flex">
              <button className="py-2 px-4 bg-[#914F1E] text-[#fff] font-mont font-semibold rounded-md" onClick={e => {e.preventDefault(); saveInfo();}}>Save</button>
              <button className="py-2 px-4 bg-[#B5C18E] text-[#333] font-mont font-semibold rounded-md ml-2" 
              onClick={(e) => {
                e.preventDefault(); 
                setUpdateInfo(false);
              }}>
                Cancel
              </button>
            </div>
          </form>
          }
        </div>
    </div>
  )
}
