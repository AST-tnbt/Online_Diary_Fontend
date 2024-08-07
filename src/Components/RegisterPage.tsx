export default function RegisterPage() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-t from-[#B5C18E] to-white">
        <form action="submit" className="flex flex-col w-[25%] mt-[10%] m-auto p-10 shadow-lg rounded-md bg-[#fff]">
          <label htmlFor="inputUsername" className="font-mont text-lg text-[#914F1E] font-medium">Username</label>
          <input type="text" name="username" id="inputUsername" placeholder="Enter username" className="text-lg font-mont border-2 rounded-md p-2 border-[#B5C18E] outline-none mt-2"/>
          <label htmlFor="inputPassword" className="font-mont text-lg text-[#914F1E] font-medium mt-2">Password</label>
          <input type="password" name="password" id="inputPassword" placeholder="Enter password" className="text-lg font-mont border-2 rounded-md p-2 border-[#B5C18E] outline-none mt-2"/>
          <label htmlFor="inputConfirm" className="font-mont text-lg text-[#914F1E] font-medium mt-2">Confirm password</label>
          <input type="password" name="password" id="inputConfirm" placeholder="Enter password" className="text-lg font-mont border-2 rounded-md p-2 border-[#B5C18E] outline-none mt-2"/>
          <button className="py-2 bg-[#914F1E] mt-6 text-[#fff] font-mont font-medium rounded-md">Register</button>
        </form>
      </div>
  )
}
