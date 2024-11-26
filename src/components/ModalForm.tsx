"use client";
import { useMainContext } from "@/context/MainContext";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { groupProps, taskProps } from "@/types/types";

export default function ModalForm({
  show,
  type = "update",
  groupList = [],
}: {
  show: boolean;
  type: "create" | "update" | "create-calendar" | "update-calendar";
  groupList: groupProps[];
}) {
  const mainContext = useMainContext();
  const [taskData, setTaskData] = useState<taskProps>(
    mainContext?.taskTemp as taskProps
  );

  // console.log("TASKDATA: ", taskData);
  const handleCloseModal = () => {
    mainContext?.setTaskTemp(undefined);
    mainContext?.setModal(false);
  };

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGroup = groupList.find(group => group.id === e.target.value);
    if (selectedGroup !== undefined) {
      setTaskData({ ...taskData, _id: selectedGroup.id || "" });
    }
  };

  if (!show) return null;
  return (
    <div className="w-[50vw] aspect-[801/605] rounded-xl bg-netral-200 drop-shadow-xl p-6 relative flex flex-col justify-evenly items-center z-10">
      <button className="absolute top-2 right-2" onClick={handleCloseModal}>
        <FaTimes className="text-[30px] text-netral-300" />
      </button>
      <form className="w-full h-full justify-center p-6 flex flex-col gap-y-4 relative">
        <div className="w-full flex flex-col justify-center items-start text-sm text-netral-600 relative">
          <label htmlFor="taskTitle" className="text-start w-full ">
            Task Title
          </label>
          <input
            type="text"
            name="taskTitle"
            id="taskTitle"
            className="w-full border-[1px] py-1 px-3 font-normal text-lg rounded-md border-gray-400 text-netral-300 bg-netral-100"
            value={taskData.title}
            onChange={(e) =>
              setTaskData({ ...taskData, title: e.target.value })
            }
          />
        </div>
        <div className="w-full flex flex-col justify-center items-start text-sm text-netral-600 relative">
          <label htmlFor="deadline" className="text-start w-full ">
            Deadline
          </label>
          <input
            type="date"
            name="date"
            id="dateline"
            className="w-full border-[1px] py-1 px-3 font-normal text-lg rounded-md border-gray-400 text-netral-300 bg-netral-100 "
            value={
              taskData.deadline
                ? new Date(taskData.deadline).toISOString().substring(0, 10)
                : ""
            }
            onChange={(e) =>
              setTaskData({ ...taskData, deadline: new Date(e.target.value) })
            }
          />
        </div>
        {(type === "create-calendar" || "update-calendar" )&& (
          <div className="w-full flex flex-col justify-center items-start text-sm text-netral-600 relative">
            <label htmlFor="group" className="text-start w-full ">
              Group
            </label>
            <select
              name="group"
              id="group"
              className="w-full border-[1px] py-1 px-3 font-normal text-lg rounded-md border-gray-400 text-netral-300 bg-netral-100"
              value={taskData._id}
              onChange={handleGroupChange}
            >
              <option value="" disabled>
                {groupList.length > 0 ? "Select a group" : "Create a group first"}
              </option>
              {groupList?.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.title}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="w-full flex flex-col justify-center items-start text-sm text-netral-600 relative">
          <label htmlFor="description" className="text-start w-full ">
            description
          </label>
          <textarea
            name="description"
            id="description"
            className="w-full h-fit border-[1px] py-1 px-3 font-normal text-lg rounded-md border-gray-400 text-netral-300 bg-netral-100"
            value={taskData.description}
            onChange={(e) =>
              setTaskData({ ...taskData, description: e.target.value })
            }
          ></textarea>
          {/* <input
            type="text"
            name="description"
            id="description"
            className="w-full border-[1px] py-1 px-3 font-normal text-lg rounded-md border-gray-400 text-netral-300 bg-netral-100"
          /> */}
        </div>
        <div className="absolute w-full bottom-2 right-1 flex gap-x-3 justify-end items-center">
          <button
            className="text-netral-600 bg-utama-200 hover:bg-blue-300 hover:duration-300 rounded-xl p-2"
            onClick={() => {
              if (type === "update" || type === "update-calendar") {
                mainContext?.updateTask({
                  taskID: taskData._id,
                  title: taskData.title,
                  deadline: taskData.deadline,
                  description: taskData.description,
                  status: taskData.status,
                });
              } else if (type === "create" || type === "create-calendar") {
                mainContext?.createTask({
                  groupID: taskData._id,
                  title: taskData.title,
                  deadline: taskData.deadline,
                  description: taskData.description,
                  status: taskData.status,
                });
              }
              mainContext?.fetchTasks?.();
              handleCloseModal();
            }}
          >
            Confirm
          </button>
          <button
            className="text-netral-300 border-[1px] border-netral-300 hover:bg-netral-400 hover:text-netral-200 hover:duration-300 bg-transparent rounded-xl p-2"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
