import { Link } from "react-router-dom";

interface AccountPageProp{
  username: string;
}

export default function AccountPage({username}: AccountPageProp) {
  return (
    <div className='w-full min-h-screen pt-20 pb-20 bg-gradient-to-t from-[#B5C18E] to-white '>
        <Link to={`/home/${username}`}>
          <h2 className="ml-16 font-mont text-lg font-medium underline">Back to home</h2>
        </Link>
        <div className="m-auto w-[30%] mt-[10%] shadow-lg rounded-md p-10 space-y-2 bg-[#fff] relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute right-4 top-4 hover:cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>

            <h3 className="font-mont text-3xl font-semibold">AST</h3>
            <div className="font-mont text-lg flex space-x-2">
                <h3>Gender: </h3>
                <h3>Male</h3>
            </div>
            <div className="font-mont text-lg flex space-x-2">
                <h3>Day of birth: </h3>
                <h3>03-08-2024</h3>
            </div>
        </div>
    </div>
  )
}
