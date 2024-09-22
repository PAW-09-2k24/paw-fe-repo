import { BiSearch } from "react-icons/bi";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { TaskCard } from "./TaskCard";
import { useAuthContext } from "@/context/AuthContext";

export const ToDoContent: React.FC = () => {
  const authContext = useAuthContext();
  return (
    <div className="w-screen h-screen bg-netral-200 relative font-exo pl-[22.5vw] pt-[3vw] pb-[2.5vw] flex justify-center items-center pr-[2.5vw]">
      <span className="font-medium text-netral-600 text-[20px] absolute top-[.7vw] left-[22.5vw]">
        Welcome back, {authContext?.user?.username}!
      </span>
      <button className="absolute top-[.7vw] right-[2.5vw]">
        <BiSearch className="text-[24px] text-netral-600" />
      </button>
      <div className="w-full h-full flex flex-col items-center justify-start bg-netral-100 drop-shadow-lg rounded-xl py-3 px-6 gap-y-4">
        <div className="w-full h-fit flex justify-between font-normal text-netral-600">
          <span className="text-[24px]">Group 1</span>
          <div className="flex justify-between items-center gap-x-4 text-[20px]">
            <div className="flex justify-start items-center gap-x-2 cursor-pointer">
              <FaPlusCircle className="text-[20px] text-utama-200 cursor-pointer" />
              <span className="text-[16px]">Add new Task</span>
            </div>
            <div className="flex justify-start items-center gap-x-2 cursor-pointer">
              <FaTrash className="text-[20px] text-netral-600 cursor-pointer" />
              <span className="text-[16px]">Delete Group</span>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex-wrap">
            <TaskCard />

        </div>
      </div>
    </div>
  );
};
