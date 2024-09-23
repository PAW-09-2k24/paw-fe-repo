import { groupProps, taskProps } from "@/types/types";

// Function to find group IDs that include a specific task ID
// export function findGroupsByTaskID(taskID:string, groups:groupProps[]) {
//     console.log("PARAM GRUP: ",groups);
//     return groups
//       .filter(group => group.tasks.map(task => task._id === taskID))
//   }
export function findGroupIDsByTaskID(
  taskID: string,
  groups: groupProps[]
) {
  return groups
    .filter((group) => group.taskID && group.taskID.includes(taskID))
    .map((group) => {
      return { id: group.id, title: group.title };
    });
}

export function getTasksArray(
  groups: groupProps[],
  status: "uncompleted" | "completed"
): taskProps[] {
  return groups.flatMap((group) =>
    group.tasks.filter(
      (task) =>
        task.status !== (status === "uncompleted" ? "completed" : "uncompleted")
    )
  );
}
