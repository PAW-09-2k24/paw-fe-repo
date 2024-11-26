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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scale = 1 + scrollPosition * 0.001;
      const imageElement = document.getElementById("parallax-image");
      if (imageElement) {
        imageElement.style.transform = `scale(${scale})`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-screen h-[200vh] relative flex justify-center items-center text-main bg-netral-100">
      <Image
        id="parallax-image"
        src="/landing/library1.jpg"
        alt="logo"
        width={1920}
        height={1080}
        objectFit="cover"
      />
      
    </div>
  );
}
