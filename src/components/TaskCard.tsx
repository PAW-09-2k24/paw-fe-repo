import React, { useEffect, useState } from "react";
import { IoPencil } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { groupProps, taskProps } from "@/types/types";
import { useMainContext } from "@/context/MainContext";
import { twMerge } from "tailwind-merge";
import { findGroupIDsByTaskID } from "@/utils/utils";
import { usePathname, useRouter } from "next/navigation";


interface taskCard extends taskProps {
  type: "group" | "task";
}

interface filteredGroup{
  id: string | undefined;
  title: string;
}

export const TaskCard: React.FC<taskCard> = ({
  title,
  deadline,
  status,
  description,
  _id,
  type = "group",
}) => {
  const mainContext = useMainContext();
  const router = useRouter();
  const date = new Date(deadline);
  const path = usePathname();
  const formattedDate = date.toLocaleDateString();
  const handleEdit = () => {
    mainContext?.setTaskTemp({ title, deadline, status, description, _id });
    mainContext?.setModalType("update");
    mainContext?.setModal(true);
  };
  const [filteredGroup, setFilteredGroup] = useState<filteredGroup>(findGroupIDsByTaskID(_id, mainContext?.group as groupProps[])[0]);
  // const groups = findGroupsByTaskID(_id, mainContext?.group as groupProps[] );
  console.log("FILTER: ",filteredGroup);
  useEffect(() => {
    setFilteredGroup(findGroupIDsByTaskID(_id, mainContext?.group as groupProps[])[0]);
  }, [mainContext, path, _id]);

  return (
    <div className="w-[20vw] aspect-[4/2] relative flex flex-col justify-start items-center p-4 bg-utama-100 rounded-lg drop-shadow-md font-exo">
      <div className="w-full flex justify-between">
        <span className="text-[16px] text-netral-600">{title}</span>
        <div className="flex justify-start items-center gap-x-5">
          <IoPencil
            className="text-[12px] text-netral-600 cursor-pointer"
            onClick={handleEdit}
          />
          <FaTrash
            className="text-[12px] text-netral-600 cursor-pointer"
            onClick={() => mainContext?.deleteTask({ taskID: _id })}
          />
        </div>
      </div>
      <p className="w-full h-fit text-start text-[10px] text-netral-300">
        {description}
      </p>
      <div className="absolute w-full bottom-4 flex justify-between px-4">
        <div className="bg-[#2a3137] w-[30%] h-7 rounded-xl flex justify-center items-center relative">
          <span className="text-[10px] text-netral-300">{formattedDate}</span>
          {date < new Date() && status === "uncompleted" && (
            <div className="absolute w-full h-full  -bottom-1/2 left-1/2 transform translate-x-[55%] -translate-y-[30%] text-red-500 rounded-xl text-sm">
              Late
            </div>
          )}
        </div>
        {type === "group" ? (
          <button
            className={twMerge(
              "w-[30%] min-h-7 pb-1 flex justify-center items-center border-b-[3px]",
              status === "completed"
                ? "border-b-utama-200"
                : "border-b-yellow-300"
            )}
            onClick={() =>
              mainContext?.updateTask({
                taskID: _id,
                status: status === "completed" ? "uncompleted" : "completed",
                deadline: deadline,
                description: description,
                title: title,
              })
            }
          >
            <span className="text-[12px]">{status}</span>
          </button>
        ) : (
          <button
            className={twMerge(
              "w-[30%] min-h-7 pb-1 flex justify-center items-center border-b-[3px]",
              status === "completed"
                ? "border-b-utama-200"
                : "border-b-yellow-300"
            )}
            onClick={() =>{
              mainContext?.setPageOpen(filteredGroup.id as string);
              router.push(
                `/to-do/group/${filteredGroup.id}`
              );
            }
            }
          >
            <span className="text-[12px]">{`from ${filteredGroup.title}`}</span>
          </button>
        )}
      </div>
    </div>
  );
};
