"use client";
import { FaPlusCircle } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { useMainContext } from "@/context/MainContext";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Group: string[] = ["grup 1", "grup 2", "grup 3"];
const Tasks: string[] = ["All Tasks (11)", "To do (7)", "Done (4)"];

export const Sidebar: React.FC = () => {
  const router = useRouter();
  const params = usePathname();
  const mainContext = useMainContext();
  const [onEdit, setOnEdit] = useState<string>("");
  const [grupArr, setGrupArr] = useState<string[]>(Group);
  const [temp, setTemp] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  // Automatically focus the input when onEdit is set
  useEffect(() => {
    if (onEdit !== "" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [onEdit]);
  return (
    <div className={twMerge("fixed w-[20vw] left-0 h-screen z-[1]", 
    "flex flex-col items-center justify-start p-6 gap-y-6 bg-netral-100 font-exo text-netral-600",
    params === '/login' || params === '/register' || params === '/' ? 'hidden' : ''
    )}>
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <span className="font-bold text-[30px]">To-Done-List</span>
        <FaPlusCircle
          className="text-[30px] text-utama-200 cursor-pointer"
          onClick={() => {
            setGrupArr([...grupArr, "New Group"]);
          }}
        />
      </div>
      {/* Main Contents */}
      <div className="w-full h-fit flex flex-col items-center justify-center gap-y-10 p-1">
        {/* Group */}
        <div className="w-full h-fit flex flex-col items-center justify-center gap-y-4">
          <span className="font-bold text-[16px] w-full text-start">
            Groups
          </span>
          <div className="w-full h-fit flex flex-col items-center justify-center gap-y-5 pl-1 border-l-[2px] border-netral-400">
            <div
              className={twMerge(
                "w-full pl-7 text-[16px] font-semibold text-netral-300 relative cursor-pointer hover:text-netral-600",
                "before:absolute before:h-[.1vw] before:w-[1.2vw]",
                "before:left-[.3vw] before:top-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:bg-netral-400"
              )}
              onClick={() => mainContext?.setPageOpen("all")}
            >
              <span
                className={twMerge(
                  "px-3 py-2",
                  mainContext?.pageOpen === "all"
                    ? "bg-netral-600 text-netral-100 rounded-3xl"
                    : ""
                )}
              >
                All Groups {`(${grupArr.length})`}
              </span>
            </div>
            {grupArr.map((item, index) => (
              <div
                key={index}
                className={twMerge(
                  "w-full pl-7 text-[16px] font-semibold text-netral-300 relative cursor-pointer hover:text-netral-600",
                  "before:absolute before:h-[.1vw] before:w-[1.2vw]",
                  "before:left-[.3vw] before:top-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:bg-netral-400"
                )}
                onClick={() => mainContext?.setPageOpen(item)}
                onDoubleClick={() => {
                  inputRef.current?.focus();
                  setOnEdit(item);
                }}
                onBlur={() => {
                  setGrupArr(temp);
                  setOnEdit("");
                }}
              >
                {onEdit === item ? (
                  <input
                    ref={inputRef}
                    type="text"
                    className=" px-3 py-2 bg-netral-100 text-netral-600"
                    value={temp[index]}
                    onChange={(e) => {
                      setTemp(
                        grupArr.map((el) => (el === item ? e.target.value : el))
                      );
                      setOnEdit(item);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setGrupArr(temp);
                        setOnEdit("");
                        mainContext?.setPageOpen(temp[index]);
                      }
                    }}
                  />
                ) : (
                  <span
                    className={twMerge(
                      "px-3 py-2",
                      mainContext?.pageOpen === item
                        ? "bg-netral-600 text-netral-100 rounded-3xl"
                        : ""
                    )}
                  >
                    {item}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Tasks */}
        <div className="w-full h-fit flex flex-col items-center justify-center gap-y-4">
          <span className="font-bold text-[16px] w-full text-start">Tasks</span>
          <div className="w-full h-fit flex flex-col items-center justify-center gap-y-5 pl-1 border-l-[2px] border-netral-400">
            {Tasks.map((item, index) => (
              <div
                key={index}
                className={twMerge(
                  "w-full pl-7 text-[16px] font-semibold text-netral-300 relative cursor-pointer hover:text-netral-600",
                  "before:absolute before:h-[.1vw] before:w-[1.2vw]",
                  "before:left-[.3vw] before:top-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:bg-netral-400"
                )}
                onClick={() => mainContext?.setPageOpen(item)}
              >
                <span
                  className={twMerge(
                    "px-3 py-2",
                    mainContext?.pageOpen === item
                      ? "bg-netral-600 text-netral-100 rounded-3xl"
                      : ""
                  )}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
