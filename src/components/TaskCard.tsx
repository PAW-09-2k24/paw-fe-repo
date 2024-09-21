import React from "react";
import { IoPencil } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";

export const TaskCard: React.FC = () => {
  return (
    <div className="w-[20vw] aspect-[4/2] relative flex flex-col justify-start items-center p-4 bg-utama-100 rounded-lg drop-shadow-md font-exo">
      <div className="w-full flex justify-between">
        <span className="text-[16px] text-netral-600">Task 1</span>
        <div className="flex justify-start items-center gap-x-5">
          <IoPencil className="text-[12px] text-netral-600 cursor-pointer" />
          <FaTrash className="text-[12px] text-netral-600 cursor-pointer" />
        </div>
      </div>
      <p className="w-full h-fit text-start text-[10px] text-netral-300">description</p>
      <div className="absolute w-full bottom-4 flex justify-between px-4">
        <div className="bg-[#2a3137] w-[30%] h-7 rounded-xl flex justify-center items-center">
            <span className="text-[10px] text-netral-300">12 Nov 2023</span>
        </div>
        <button className="w-[30%] h-7 flex justify-center items-center border-b-[3px] border-b-utama-200">
        <span className="text-[12px]">Done</span>
        </button>
      </div>
    </div>
  );
};
