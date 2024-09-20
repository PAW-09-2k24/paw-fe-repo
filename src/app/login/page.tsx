"use client";
import { IoNewspaper } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  return (
    <div className="w-screen h-screen relative flex justify-center items-center bg-[#ffffff] p-10">
      <div className="absolute top-4 left-4 flex justify-start gap-x-2 p-1">
        <IoNewspaper className="text-2xl text-primary-a" />
        <span className="font-exo text-xl text-primary-a font-bold">
          To-Do-List PAW 09
        </span>
      </div>
      <div className="w-[30%] h-[50%] flex flex-col justify-between items-center gap-y-6 text-xl font-exo font-extrabold text-primary-a">
        <div className="w-full flex flex-col justify-between items-center">
          <span className="w-full text-start">Organize. Your. Chaos.</span>
          <span className="w-full text-start text-gray-400">
            Log In to Your To-Do-List Account
          </span>
        </div>
        <form className="w-full flex flex-col justify-center items-center gap-y-1">
          <div className="w-full flex flex-col justify-center items-start text-sm">
            <label htmlFor="Username" className="text-start w-full ">
              Username
            </label>
            <input
              type="text"
              name="Username"
              id="Username"
              placeholder="Enter your username"
              className="w-full border-[1px] py-1 px-3 font-normal text-lg rounded-sm border-gray-400"
            />
          </div>
          <div className="w-full flex flex-col justify-center items-start text-sm">
            <label htmlFor="Password" className="text-start w-full font-normal">
              Password
            </label>
            <input
              type="password"
              name="Password"
              id="Password"
              placeholder="Enter your password"
              className="w-full border-[1px] py-1 px-3 font-exo text-lg rounded-sm border-gray-400"
            />
          </div>
          <button className="w-full py-1 px-3 text-center font-normal bg-blue-500 text-white rounded-md text-base hover:bg-blue-800">
            Log in
          </button>
        </form>
        <div className="w-full h-fit flex flex-col gap-y-1">
          <span className="w-full text-start">Not Having Account yet?</span>
          <button className="w-full py-1 px-3 text-center font-normal bg-blue-500 text-white rounded-md text-base hover:bg-blue-800"
            onClick={() => router.push("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
