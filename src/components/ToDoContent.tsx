import { BiSearch } from "react-icons/bi";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { TaskCard } from "./TaskCard";
import { useAuthContext } from "@/context/AuthContext";
import { useMainContext } from "@/context/MainContext";
import { useState } from "react";
import { groupProps } from "@/types/types";
import { usePathname } from "next/navigation";

export const ToDoContent: React.FC = () => {
  const authContext = useAuthContext();
  const mainContext = useMainContext();
  const params = usePathname();
  const id = params.split("/")[3];
  const [selectedGroupID, setSelectedGroupID] = useState<groupProps>(
    mainContext?.group.find((group) => group.id === id) as groupProps
  );

  const handleEdit = ({
    title,
    deadline,
    status,
    description,
    _id,
    type,
  }: {
    title: string;
    deadline: Date;
    status: string;
    description: string;
    _id: string;
    type:"create" | "update";
  }) => {
    mainContext?.setTaskTemp({ title, deadline, status, description, _id });
    mainContext?.setModalType(type);
    mainContext?.setModal(true);
  };
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
          <span className="text-[24px]">
            {selectedGroupID !== undefined ? selectedGroupID.title : ""}
          </span>
          <div className="flex justify-between items-center gap-x-4 text-[20px]">
            <div
              className="flex justify-start items-center gap-x-2 cursor-pointer"
              onClick={() => handleEdit({
                title: "",
                deadline: new Date(),
                status: "uncompleted",
                description: "",
                _id: id,
                type: "create"
              })}
            >
              <FaPlusCircle className="text-[20px] text-utama-200 cursor-pointer" />
              <span className="text-[16px]">Add new Task</span>
            </div>
            <div className="flex justify-start items-center gap-x-2 cursor-pointer">
              <FaTrash className="text-[20px] text-netral-600 cursor-pointer" />
              <span className="text-[16px]">Delete Group</span>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex flex-row flex-wrap justify-between gap-5">
          {selectedGroupID?.tasks.map((item, index: number) => (
            <div className="" key={index}>
              <TaskCard
                title={item.title}
                deadline={item.deadline}
                description={item.description}
                status={item.status}
                _id={item._id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};