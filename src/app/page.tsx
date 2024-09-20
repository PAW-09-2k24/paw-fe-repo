/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { IoAddCircleOutline } from "react-icons/io5";
import { groupProps, taskProps } from "@/types/types";
import { useState } from "react";

const groupList: groupProps[] = [
  {
    id: "1",
    title: "Backlog",
    tasks: [
      {
        id: "1",
        title: "Task1",
        deadline: new Date(),
        status: "done",
        description: "Create a new task for the to-do-list app",
      },
      {
        id: "2",
        title: "Task2",
        deadline: new Date(),
        status: "done",
        description: "Create a new task for the to-do-list app",
      },
    ],
  },
  {
    id: "2",
    title: "In Progress",
    tasks: [
      {
        id: "1",
        title: "Create a new task",
        deadline: new Date(),
        status: "done",
        description: "Create a new task for the to-do-list app",
      },
      {
        id: "2",
        title: "Create a new task",
        deadline: new Date(),
        status: "done",
        description: "Create a new task for the to-do-list app",
      },
    ],
  },
  {
    id: "2",
    title: "In Progress",
    tasks: [
      {
        id: "1",
        title: "Create a new task",
        deadline: new Date(),
        status: "done",
        description: "Create a new task for the to-do-list app",
      },
      {
        id: "2",
        title: "Create a new task",
        deadline: new Date(),
        status: "done",
        description: "Create a new task for the to-do-list app",
      },
    ],
  },
  {
    id: "2",
    title: "In Progress",
    tasks: [
      {
        id: "1",
        title: "Create a new task",
        deadline: new Date(),
        status: "done",
        description: "Create a new task for the to-do-list app",
      },
      {
        id: "2",
        title: "Create a new task",
        deadline: new Date(),
        status: "done",
        description: "Create a new task for the to-do-list app",
      },
    ],
  },
  {
    id: "2",
    title: "In Progress",
    tasks: [
      {
        id: "1",
        title: "Create a new task",
        deadline: new Date(),
        status: "done",
        description: "Create a new task for the to-do-list app",
      },
      {
        id: "2",
        title: "Create a new task",
        deadline: new Date(),
        status: "done",
        description: "Create a new task for the to-do-list app",
      },
    ],
  },
  {
    id: "2",
    title: "In Progress",
    tasks: [
      {
        id: "1",
        title: "Create a new task",
        deadline: new Date(),
        status: "done",
        description: "Create a new task for the to-do-list app",
      },
      {
        id: "2",
        title: "Create a new task",
        deadline: new Date(),
        status: "done",
        description: "Create a new task for the to-do-list app",
      },
    ],
  },
];

export default function Home() {
  const [group, setGroup] = useState<groupProps[]>(groupList);
  return (
    <div className="bg-[#ffffff] w-screen h-screen relative flex justify-center items-start p-14 text-main">
      {/* Login & Register */}
      <div className="absolute top-3 right-5 w-fit h-fit flex flex-row-reverse gap-x-3 text-black font-exo font-bold">
        <button className="w-32 text-xl font-medium p-3 bg-accent rounded-xl hover:bg-[#2C7A7B] hover:duration-200">Register</button>
        <button className="w-32 text-xl font-medium p-3 bg-accent rounded-xl hover:bg-[#2C7A7B] hover:duration-200">Login</button>
      </div>
      <div className="w-full h-full flex flex-col gap-y-2">
        <h1 className="text-center text-4xl font-bold ">To-Do-List APP</h1>
        <h2 className="text-2xl font-bold ">Hai, Arden</h2>
        <div className="w-full flex justify-center">

        <button className="flex flex-col justify-center items-center" >
          <IoAddCircleOutline className=" text-6xl text-accent hover:text-[#2C7A7B] hover:duration-200" />
        </button>
        </div>
        {/* Task Content */}
        <div className="min-w-full h-fit flex justify-start overflow-x-hidden p-8 drop-shadow-md">
          <div className="w-full overflow-x-scroll flex justify-start gap-x-10">

        {groupList.map((group, index) => (
          <div key={index} className="w-[300px] h-[300px] bg-blue-50 p-2 flex flex-col drop-shadow-md justify-start gap-y-3 text-nowrap relative">
            <input type="text" name="" id="" className="w-full h-10 p-2 drop-shadow-sm"/>
            {group.tasks.map((task, index) => (
              <div key={index} className="w-[300px] h-10 bg-white drop-shadow-sm p-2 flex justify-start gap-x-2">
                <span className="w-full h-fit text-wrap">{task.title}</span>
              </div>
            ))}
          </div>
        ))}
          </div>
        </div>


      </div>
    </div>
  );
}
