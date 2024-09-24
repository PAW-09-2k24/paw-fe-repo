"use client";
import { FaPlusCircle } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { useMainContext } from "@/context/MainContext";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { groupProps, taskGroupCountProps } from "@/types/types";

// const Group: string[] = ["grup 1", "grup 2", "grup 3"];
const Tasks: string[] = ["To do", "Done"];

const hiddenArr = ["/", "/register", "/testFitur"];

export const Sidebar: React.FC = () => {
  const router = useRouter();
  const params = usePathname();
  const mainContext = useMainContext();
  const [onEdit, setOnEdit] = useState<string>("");
  const [grupArr, setGrupArr] = useState<groupProps[] | undefined>(
    mainContext?.group
  );
  const [temp, setTemp] = useState<groupProps[] | undefined>(
    mainContext?.group
  );
  const [countTask, setCountTask] = useState<taskGroupCountProps | undefined>(
    mainContext?.countTask
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const authContext = useAuthContext();
  // Automatically focus the input when onEdit is set
  useEffect(() => {
    if (onEdit !== "" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [onEdit]);

  useEffect(() => {
    setGrupArr(mainContext?.group);
  }, [mainContext?.group, router]);

  useEffect(() => {
    setCountTask(mainContext?.countTask);
  }, [mainContext?.countTask, router]);

  return (
    <div
      className={twMerge(
        "fixed w-[20vw] left-0 h-screen z-[1]",
        "flex flex-col items-center justify-start p-6 gap-y-6 bg-netral-100 font-exo text-netral-600",
        hiddenArr.includes(params) ? "hidden" : ""
      )}
    >
      {/* Logout */}
      <div className="absolute w-[20vw] h-[2vw] bottom-[1vw] left-0 flex justify-center items-center px-6 py-2">
        <button
          className="w-full border-[1px] border-netral-400 hover:text-netral-200 hover:bg-netral-400 hover:duration-300 rounded-2xl text-netral-500 text-sm"
          onClick={(e) => {
            e.preventDefault();
            authContext?.onLogout();
          }}
        >
          Logout
        </button>
      </div>
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <span className="font-bold text-[30px]">To-Done-List</span>
        <FaPlusCircle
          className="text-[30px] text-utama-200 cursor-pointer"
          onClick={() => {
            mainContext?.createGroup({groupTitle: "New Group", userID: authContext?.user?.id as string});
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
            {grupArr?.map((item, index) => (
              <div
                key={index}
                className={twMerge(
                  "w-full pl-7 text-[16px] font-semibold text-netral-300 relative cursor-pointer hover:text-netral-600",
                  "before:absolute before:h-[.1vw] before:w-[1.2vw]",
                  "before:left-[.3vw] before:top-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:bg-netral-400"
                )}
                onClick={() => {
                  mainContext?.setPageOpen(item.id as string);
                  setTemp(grupArr);
                  mainContext?.setGroupTemp(item as groupProps);
                  router.push(("/to-do/group/" + item.id) as string);
                }}
                onDoubleClick={() => {
                  inputRef.current?.focus();
                  setOnEdit(item.id as string);
                }}
                onBlur={() => {
                  setGrupArr(temp);
                  setOnEdit("");
                }}
              >
                {onEdit === item.id ? (
                  <input
                    ref={inputRef}
                    type="text"
                    className=" px-3 py-2 bg-netral-100 text-netral-600"
                    value={temp?.[index].title as string}
                    onChange={(e) => {
                      setTemp(
                        grupArr.map((el) => {
                          if (el.id === item.id) {
                            return { ...el, title: e.target.value };
                          }
                          return el;
                        })
                      );
                      setOnEdit(item.id as string);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setGrupArr(temp);
                        setOnEdit("");
                        mainContext?.setPageOpen(
                          (temp as groupProps[])[index].id as string
                        );
                        // console.log("CEKK: ", temp?.[index].id);
                        if (temp?.[index].id === undefined) {
                          mainContext?.createGroup({
                            userID: authContext?.user?.id as string,
                            groupTitle: temp?.[index].title as string,
                          });
                        } else if (temp?.[index].id) {
                          mainContext?.updateGroup({
                            groupID: temp?.[index].id as string,
                            groupTitle: temp?.[index].title as string,
                          });
                        }
                      }
                    }}
                  />
                ) : (
                  <span
                    className={twMerge(
                      "px-3 py-2",
                      mainContext?.pageOpen === item.id
                        ? "bg-netral-600 text-netral-100 rounded-3xl"
                        : ""
                    )}
                  >
                    {item.title}
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
                onClick={() => {
                  mainContext?.setPageOpen(item);
                  router.push(
                    "/to-do/" + item.split(" ").join("-").toLowerCase()
                  );
                }}
              >
                <span
                  className={twMerge(
                    "px-3 py-2",
                    mainContext?.pageOpen === item
                      ? "bg-netral-600 text-netral-100 rounded-3xl"
                      : ""
                  )}
                >
                  {item === "To do"
                    ? `${item} (${countTask?.uncompletedCount?.toString()})`
                    : `${item} (${countTask?.completedCount?.toString()})`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
