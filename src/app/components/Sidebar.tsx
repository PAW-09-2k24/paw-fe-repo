import { FaPlusCircle } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

const Group: string[] = ["grup 1", "grup 2", "grup 3"];

export const Sidebar: React.FC = () => {
  return (
    <div className="fixed w-[20vw] left-0 h-screen flex flex-col items-center justify-start p-6 gap-y-6 bg-netral-100 font-exo text-netral-600">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <span className="font-bold text-[30px]">To-Done-List</span>
        <FaPlusCircle className="text-[30px] text-utama-200 cursor-pointer" />
      </div>
      {/* Main Contents */}
      <div className="w-full h-fit flex flex-col items-center justify-center gap-y-10 p-1">
        {/* Group */}
        <div className="w-full h-fit flex flex-col items-center justify-center gap-y-4">
          <span className="font-bold text-[16px] w-full text-start">
            Groups
          </span>
          <div className="w-full h-fit flex flex-col items-center justify-center gap-y-5 pl-1 border-l-[2px] border-netral-400">
            {Group.map((item, index) => (
              <div
                key={index}
                className={twMerge(
                  "w-full pl-7 text-[16px] font-semibold text-netral-300 relative cursor-pointer hover:text-netral-600",
                  "before:absolute before:h-[.1vw] before:w-[1.2vw]",
                  "before:left-[.3vw] before:top-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:bg-netral-400"
                )}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        {/* Tasks */}
        <div className="w-full h-fit flex flex-col items-center justify-center gap-y-4">
          <span className="font-bold text-[16px] w-full text-start">
            Tasks
          </span>
          <div className="w-full h-fit flex flex-col items-center justify-center gap-y-5 pl-1 border-l-[2px] border-netral-400">
              <div
                className={twMerge(
                  "w-full pl-7 text-[16px] font-semibold text-netral-300 relative cursor-pointer hover:text-netral-600",
                  "before:absolute before:h-[.1vw] before:w-[1.2vw]",
                  "before:left-[.3vw] before:top-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:bg-netral-400"
                )}
              >
                All tasks (11)
              </div>
              <div
                className={twMerge(
                  "w-full pl-7 text-[16px] font-semibold text-netral-300 relative cursor-pointer hover:text-netral-600",
                  "before:absolute before:h-[.1vw] before:w-[1.2vw]",
                  "before:left-[.3vw] before:top-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:bg-netral-400"
                )}
              >
                To do (4)
              </div>
              <div
                className={twMerge(
                  "w-full pl-7 text-[16px] font-semibold text-netral-300 relative cursor-pointer hover:text-netral-600",
                  "before:absolute before:h-[.1vw] before:w-[1.2vw]",
                  "before:left-[.3vw] before:top-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:bg-netral-400"
                )}
              >
                Done (7)
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
