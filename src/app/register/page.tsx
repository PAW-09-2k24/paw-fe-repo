"use client";
import { IoNewspaper, IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const router = useRouter();
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#ffffff] p-10">
      <div className="absolute top-4 left-4 flex justify-start gap-x-2 p-1">
        <IoNewspaper className="text-2xl text-primary-a" />
        <span className="font-exo text-xl text-primary-a font-bold">
          To-Do-List PAW 09
        </span>
      </div>
      <div className="w-[30%] h-[50%] flex flex-col justify-between items-center gap-y-6 text-xl font-exo font-extrabold text-primary-a">
        <div className="w-full flex flex-col justify-between items-center">
          <span className="w-full text-start">Conquer your day, one task at a time.</span>
          <span className="w-full text-start text-gray-400">
            Create your account!
          </span>
        </div>
        <form className="w-full flex flex-col justify-center items-center gap-y-1 text-sm">
          <div className="w-full flex flex-col justify-center items-start text-sm">
            <label htmlFor="Username" className="text-start w-full font-normal">
              Username
            </label>
            <input
              type="text"
              name="Username"
              id="Username"
              placeholder="Enter your username"
              className="w-full border-[1px] py-1 px-3 font-exo font-normal text-base rounded-sm border-gray-400"
            />
          </div>
          <div className="w-full flex flex-col justify-center items-start text-sm relative">
            <label htmlFor="Password" className="text-start w-full font-normal">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="Password"
              id="Password"
              placeholder="Enter your password"
              className="w-full border-[1px] py-1 px-3 font-exo font-normal text-base rounded-sm border-gray-400"
            />
            {showPassword ? (
                <IoEyeSharp className="absolute top-[25px] right-2 text-xl text-gray-400 cursor-pointer" onClick={() => setShowPassword(false)}/>
            ) : (
                
                <BsEyeSlashFill className="absolute top-[25px] right-2 text-xl text-gray-400 cursor-pointer" onClick={() => setShowPassword(true)}/>
            )}
          </div>
          <div className="w-full flex flex-col justify-center items-start text-sm relative">
            <label htmlFor="ConfirmPassword" className="text-start w-full font-normal">
              Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="Password"
              id="ConfirmPassword"
              placeholder="Enter your password"
              className="w-full border-[1px] py-1 px-3 font-exo font-normal text-base rounded-sm border-gray-400"
            />
            {showConfirmPassword ? (
                <IoEyeSharp className="absolute top-[25px] right-2 text-xl text-gray-400 cursor-pointer" onClick={() => setShowConfirmPassword(false)}/>
            ) : (
                
                <BsEyeSlashFill className="absolute top-[25px] right-2 text-xl text-gray-400 cursor-pointer" onClick={() => setShowConfirmPassword(true)}/>
            )}
          </div>
          <button className="w-full py-1 px-3 text-center font-normal bg-blue-500 text-white rounded-md text-base hover:bg-blue-800" >
            Register
          </button>
        </form>
        <div className="w-full h-fit flex flex-col gap-y-1">
          <span className="w-full text-start">Already Have Account?</span>
          <button className="w-full py-1 px-3 text-center font-normal bg-blue-500 text-white rounded-md text-base hover:bg-blue-800"
            onClick={() => router.push("/login")}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
