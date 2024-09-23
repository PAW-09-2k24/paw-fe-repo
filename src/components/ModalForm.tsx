"use client";
import { FaTimes } from "react-icons/fa";

export default function ModalForm() {
  return (
    <div className="w-[50vw] aspect-[801/605] rounded-xl  bg-netral-200 drop-shadow-lg p-6 relative flex flex-col justify-evenly items-center">
      <button className="absolute top-1 right-1">
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
            className="w-full border-[1px] py-1 px-3 font-normal text-lg rounded-md border-gray-400 text-netral-300 bg-netral-100"
          />
        </div>
        <div className="w-full flex flex-col justify-center items-start text-sm text-netral-600 relative">
          <label htmlFor="description" className="text-start w-full ">
            description
          </label>
          <textarea
            name="description"
            id="description"
            className="w-full h-fit border-[1px] py-1 px-3 font-normal text-lg rounded-md border-gray-400 text-netral-300 bg-netral-100"
          ></textarea>
          {/* <input
            type="text"
            name="description"
            id="description"
            className="w-full border-[1px] py-1 px-3 font-normal text-lg rounded-md border-gray-400 text-netral-300 bg-netral-100"
          /> */}
        </div>
        <div className="absolute w-full bottom-2 right-1 flex gap-x-3 justify-end items-center">
            <button className="text-netral-600 bg-utama-200 hover:bg-blue-300 hover:duration-300 rounded-xl p-2">Confirm</button>
            <button className="text-netral-300 border-[1px] border-netral-300 hover:bg-netral-400 hover:text-netral-200 hover:duration-300 bg-transparent rounded-xl p-2">Cancel</button>
        </div>
      </form>
    </div>
  );
}
