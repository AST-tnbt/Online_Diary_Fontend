import {Link, useNavigate} from "react-router-dom"; 
import { useAuth } from "./security/AuthContext";

export default function Header() {
    const authContext = useAuth();
    const isAuthenticated = authContext?.isAuthenticated;
    const navigate = useNavigate();
    const logout = () => {
        authContext?.logout();
        navigate("/");
    }
  return (
      <nav className="flex justify-between top-0 left-0 p-4 items-center shadow-lg fixed w-full z-10 bg-[#fff] ">
          <div className="ml-12">
              <h2 className="text-[#914F1E] font-bold text-4xl font-mont">ONLINE DIARY</h2>
          </div>
          <div className="space-x-4 mr-12 flex">
            {
                !isAuthenticated &&
                <Link to="/login">
                    <button className="text-xl font-mont font-semibold px-4 py-2 bg-[#914F1E] border-[#914F1E] border-2 text-[#FFF] rounded-lg">Login</button>
                </Link>
            }
            {
                !isAuthenticated &&
                <Link to="/register">
                    <button className="text-xl font-mont font-semibold px-4 py-2 border-[#B5C18E] border-2 text-[#914F1E] rounded-lg">Register</button>
                </Link>
            }       
            {
                isAuthenticated &&
                <h3 className="text-xl font-mont font-semibold hover:cursor-pointer text-[#914F1E]" onClick={logout}>Log out</h3>
            }    
          </div>
      </nav>
  )
}
