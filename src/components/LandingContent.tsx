"use client";
import { useRouter } from "next/navigation";

const LandingContent: React.FC = () => {
  const router = useRouter();

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center text-utama-400">
      <div className="w-full h-full px-96 py-10 flex flex-col justify-center  gap-y-4">
        <p className="text-[96px] font-bold">
          Tidy Up Your Day <span className="text-utama-200">Effortlessly</span>{" "}
          w/ To-Do App
        </p>
        <p className="font-normal text-[16px]">
          Take control of your schedule and make every day more productive with
          our to-do list app. Our app helps you stay organized and focused.
        </p>
        <button 
        className="bg-utama-200 px-6 py-3 text-utama-100 text-[24px] rounded-3xl w-[200px] hover:bg-gray-500 duration-300"
        onClick={() => router.push("/login")}
        >
          Try Now
        </button>
      </div>
    </div>
  );
};

export default LandingContent;
