/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { IoAddCircleOutline } from "react-icons/io5";
import { groupProps, taskProps } from "@/types/types";
import { useState } from "react";
import { Sidebar } from "@/app/components/Sidebar";

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
    <div className="bg-[#ffffff] w-screen h-screen relative flex justify-center items-start text-main">
      <Sidebar/>
    </div>
  );
}
