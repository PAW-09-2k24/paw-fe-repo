import React from "react";
import { IoPencil } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { taskProps } from "@/types/types";
import { useMainContext } from "@/context/MainContext";

export const TaskCard: React.FC<taskProps> = ({title, deadline, status, description, _id}) => {
  const mainContext = useMainContext();
  const date = new Date(deadline);
  const formattedDate = date.toLocaleDateString();
  const handleEdit = () => {
    mainContext?.setTaskTemp({title, deadline, status, description, _id});
    mainContext?.setModalType("update");
    mainContext?.setModal(true);
  }
  return (
    <div className="w-[20vw] aspect-[4/2] relative flex flex-col justify-start items-center p-4 bg-utama-100 rounded-lg drop-shadow-md font-exo">
      <div className="w-full flex justify-between">
        <span className="text-[16px] text-netral-600">{title}</span>
        <div className="flex justify-start items-center gap-x-5">
          <IoPencil className="text-[12px] text-netral-600 cursor-pointer" onClick={handleEdit}/>
          <FaTrash className="text-[12px] text-netral-600 cursor-pointer" />
        </div>
      </div>
      <p className="w-full h-fit text-start text-[10px] text-netral-300">{description}</p>
      <div className="absolute w-full bottom-4 flex justify-between px-4">
        <div className="bg-[#2a3137] w-[30%] h-7 rounded-xl flex justify-center items-center relative">
            <span className="text-[10px] text-netral-300">{formattedDate}</span>
            {date < new Date() && <div className="absolute w-full h-full  -bottom-1/2 left-1/2 transform translate-x-[55%] -translate-y-[30%] text-red-500 rounded-xl text-sm">Late</div>}
        </div>
        <button className="w-[30%] h-7 flex justify-center items-center border-b-[3px] border-b-utama-200">
        <span className="text-[12px]">{status}</span>
        </button>
      </div>
    </div>
  );
};
