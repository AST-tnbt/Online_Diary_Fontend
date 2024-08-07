// import { callHelloWorld } from "./api/HelloApiService"

  export default function WelcomePage() {
    // const callHello = () => {
    //   callHelloWorld()
    //     .then((response) => {console.log(response)})
    //     .catch((error) => {console.log(error)})
    //     .finally(()=> {console.log("clean up")})
    // }
    return (
      <div className="w-full min-h-screen p-[20%] bg-gradient-to-t from-[#B5C18E] to-white from-10% items-center">
          <p className="font-mono text-[#914F1E] text-6xl font-semibold text-center">WELCOME!</p>
          <p className="font-mono text-[#914F1E] mt-8 text-4xl font-semibold text-center">How's your today? Write your thoughts.</p>
          {/* <button className="bg-[#fff] font-mont font-medium rounded-lg mt-4 p-2 shadow-md block m-auto" onClick={callHello}>Call hello world API</button> */}
      </div>
    )
  }
