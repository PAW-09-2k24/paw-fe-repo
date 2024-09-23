/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { groupProps, taskProps } from "@/types/types";
import { ButtonHTMLAttributes, MouseEventHandler, useEffect, useState } from "react";
import Image from "next/image";
import { InputForm } from "@/components/InputForm";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useAuthContext } from "@/context/AuthContext";

export default function Home() {
  const router = useRouter();
  const authContext = useAuthContext();
  if (authContext?.user) {
    router.push("/to-do");
  }
  const [type, setType] = useState<"login" | "register">("login");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    authContext?.onLogin({
      username: username,
      password: password,
    });
  };
  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    authContext?.onRegister({
      username: username,
      password: password,
    });
  };

  
  return (
    <div className=" w-screen h-screen relative flex justify-center items-center text-main bg-netral-100">
      {/* Login Section */}
      <div
        className={twMerge(
          "w-[70vw] h-[80%] duration-1000",
          type === "login" ? "flex flex-row" : "flex flex-row-reverse",
          " justify-center items-center",
          "bg-netral-200 relative drop-shadow-md rounded-xl"
        )}
      >
        <div className="absolute w-full h-full blur-lg z-0">
          <Image src="/login.jpg" alt="logo" fill objectFit="cover" />
        </div>
        <div className={twMerge("w-[30%]", "h-full")}></div>
        {type === "login" ? (
          <form
            className={twMerge(
              "w-[70%]",
              "h-full flex flex-col justify-center items-center gap-y-4 bg-netral-100/80 backdrop-blur-sm z-[1] rounded-r-xl p-4"
            )}
            onSubmit={handleSubmit}
          >
            <div className="w-full font-exo font-bold text-[85px] flex justify-evenly">
              <span className="text-netral-600">Hello,</span>
              <span className="text-utama-200">Welcome!</span>
            </div>
            <div className="w-full h-fit flex flex-col gap-y-4 p-5">
              <InputForm
                type="text"
                label="Username"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(newValue:string) => setUsername(newValue) }
              />
              <InputForm
                type="password"
                label="Password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(newValue:string) => setPassword(newValue) }
              />
              <button className="w-full h-fit text-center p-[6px] bg-utama-200 rounded-lg text-netral-600 hover:bg-utama-200/50" 
                type="submit"
              >
                Log In
              </button>
              <div className="flex w-full justify-start gap-x-2">
                <span className="text-netral-600">{`Don't have account?`}</span>
                <button
                  className="text-utama-200 hover:underline"
                  onClick={() => setType("register")}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div
            className={twMerge(
              "w-[70%]",
              "h-full flex flex-col justify-center items-center gap-y-4 bg-netral-100/80 backdrop-blur-sm z-[1] rounded-r-xl p-4"
            )}
          >
            <div className="w-full font-exo font-bold text-[60px] flex flex-col justify-center items-center pl-8">
              <div className="w-full flex justify-start gap-x-4">
                <span className="text-netral-600">Create</span>
                <span className="text-utama-200">Account</span>
              </div>
              <span className="text-neutral-500 mt-[-15px] text-[20px] w-full">
                Organize. Your. Chaos.
              </span>
            </div>
            <form className="w-full h-fit flex flex-col gap-y-4 p-5" onSubmit={handleRegister}>
              <InputForm
                type="text"
                label="Username"
                id="username"
                placeholder="Enter your username..."
                value={username}
                onChange={(newValue:string) => setUsername(newValue) }
              />
              <InputForm
                type="password"
                label="Password"
                id="password"
                placeholder="Enter your password..."
                value={password}
                onChange={(newValue:string) => setPassword(newValue) }
                
              />
              <InputForm
                type="password"
                label="Confirm Password"
                id="Confirmpassword"
                placeholder="Confirm Your Password..."
                value={confirmPassword}
                onChange={(newValue:string) => setConfirmPassword(newValue) }
              />
              {password !== confirmPassword ? (
                <span className="text-red-500">{`Password doesn't match`}</span>
              ) : (
                null
              )}
              <button className="w-full h-fit text-center p-[6px] bg-utama-200 rounded-lg text-netral-600 hover:bg-utama-200/50 disabled:cursor-not-allowed disabled:bg-netral-300"
                disabled={password !== confirmPassword}
                type="submit"
              >
                Register
              </button>
              <div className="flex w-full justify-start gap-x-2">
                <span className="text-netral-600">{`Already have account?`}</span>
                <button
                  className="text-utama-200 hover:underline"
                  onClick={() => setType("login")}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
