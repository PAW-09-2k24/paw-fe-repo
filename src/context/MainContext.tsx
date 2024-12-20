/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { groupProps, taskGroupCountProps, eventProps, taskProps, userProps } from "@/types/types";
import axios from "axios";
import { apiRoutes } from "@/API/routes";
import { useAuthContext } from "./AuthContext";
import ModalForm from "@/components/ModalForm";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface MainContextProps {
  pageOpen: string;
  setPageOpen: React.Dispatch<React.SetStateAction<string>>;
  group: groupProps[];
  groupList?: groupProps[];
  setGroup: React.Dispatch<React.SetStateAction<groupProps[]>>;
  updateGroup: ({
    groupID,
    groupTitle,
  }: {
    groupID: string;
    groupTitle: string;
  }) => void;
  createGroup: ({
    userID,
    groupTitle,
  }: {
    userID: string;
    groupTitle: string;
  }) => void;
  updateTask: ({
    taskID,
    title,
    deadline,
    status,
    description,
    
  }: {
    taskID: string;
    title: string;
    deadline: Date;
    status: string;
    description: string;
  }) => void;
  createTask: ({
    groupID,
    title,
    deadline,
    status,
    description,
    
  }: {
    groupID: string;
    title: string;
    deadline: Date;
    status: string;
    description: string;
  }) => void;
  groupTemp?: groupProps;
  setGroupTemp: React.Dispatch<React.SetStateAction<groupProps | undefined>>;
  task?: taskProps[];
  setTask: React.Dispatch<React.SetStateAction<taskProps[] | undefined>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  taskTemp?: taskProps;
  setTaskTemp: React.Dispatch<React.SetStateAction<taskProps | undefined>>;
  fetchTasks?: () => void;
  taskList?: taskProps[];
  eventList?: eventProps[];
  modalType: "create" | "update" | "create-calendar" | "update-calendar" | "";
  setModalType: React.Dispatch<React.SetStateAction<"create" | "update" | "create-calendar" | "update-calendar" | "">>;
  deleteTask: ({taskID}:{taskID:string}) => void;
  deleteGroup: ({groupID}:{groupID:string}) => void;
  countTask?: taskGroupCountProps | undefined;
  setCountTask: React.Dispatch<React.SetStateAction<taskGroupCountProps | undefined>>;

}

interface groupFetch extends groupProps {
  _id: string;
}

const MainContext = createContext<MainContextProps | undefined>(undefined);

export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const authContext = useAuthContext();
  // console.log("USER BANG:", authContext?.user);
  const [group, setGroup] = useState<groupProps[]>([]);
  const [groupTemp, setGroupTemp] = useState<groupProps | undefined>(undefined);
  const [task, setTask] = useState<taskProps[] | undefined>(undefined);
  const [taskTemp, setTaskTemp] = useState<taskProps | undefined>(undefined);
  const [pageOpen, setPageOpen] = useState<string>("to-do");
  const [modal, setModal] = useState<boolean>(false);
  const [taskList, setTaskList] = useState<taskProps[]>([]);
  const [eventList, setEventList] = useState<eventProps[]>([]);
  const [modalType, setModalType] = useState<"create" | "update" | "create-calendar" | "update-calendar" |"">("");
  const [countTask, setCountTask] = useState<taskGroupCountProps>();

  const getGroupData = useCallback((user: userProps) => {
    // toast("Fetching data...");
    axios
      .get(apiRoutes.groups.user, {
        params: {
          userID: user.id,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        const groupData = res.data.data.map((group: groupFetch) => {
          return {
            id: group._id as string,
            title: group.title as string,
            taskID: group.taskID as string[],
            tasks: group.tasks as taskProps[],
          };
        });
        // toast.success(res.data.message);
        // console.log(res.data.message);
        // console.log(groupData);
        setGroup(groupData);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
        // console.log(err);
      });
  }, []);
  const fetchTasks = useCallback(() => {
    axios
      .get(apiRoutes.tasks.all, {
        params: {
          userID: authContext?.user?.id,
        },
        headers: {
          Authorization: `Bearer ${authContext?.user?.token}`,
        },
      })
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          setTaskList(res.data.data);
          const events = res.data.data.map((task: taskProps) => ({
            id: task._id,
            title: task.title,
            start: task.deadline,
            allDay: true,
          }));
          setEventList(events);
        } else {
          console.error("Unexpected response data format:", res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, [authContext]);
  const getCountTask = useCallback((user: userProps) => {
    axios
      .get(apiRoutes.groups.count, {
        params: {
          userID: user.id,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        const groupData = res.data.data;
        setCountTask({
          groupCount: groupData.groupCount,
          taskCount: groupData.taskCount,
          completedCount: groupData.completedCount,
          uncompletedCount: groupData.uncompletedCount,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateGroup = ({
    groupID,
    groupTitle,
  }: {
    groupID: string;
    groupTitle: string;
  }) => {
    toast("Updating group...");
    axios
      .patch(
        apiRoutes.groups.main,
        {
          title: groupTitle,
        },
        {
          params: {
            groupID: groupID,
          },
          headers: {
            Authorization: `Bearer ${authContext?.user?.token}`,
            withCredentials: true,
          },
        }
      )
      .then((res) => {
        // console.log(res.data.message);
        getGroupData(authContext?.user as userProps);
        toast.success("Berhasil update group");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        // console.log(err);
      });
  };

  const createGroup = ({
    userID,
    groupTitle,
  }: {
    userID: string;
    groupTitle: string;
  }) => {
    toast("Creating group...");
    axios
      .post(
        apiRoutes.groups.main,
        {
          title: groupTitle,
        },
        {
          params: {
            userID: userID,
          },
          headers: {
            Authorization: `Bearer ${authContext?.user?.token}`,
            withCredentials: true,
          },
        }
      )
      .then((res) => {
        // console.log(res.data.message);
        getGroupData(authContext?.user as userProps);
        toast.success(res.data.message);

      })
      .catch((err) => {
        toast.error("Group creation failed");
        // console.log(err);
      });
  };
  const updateTask = ({
    taskID,
    title,
    deadline,
    status,
    description,
    
  }: {
    taskID: string;
    title: string;
    deadline: Date;
    status: string;
    description: string;
  }) => {
    toast("Updating task...");
    axios
      .patch(
        apiRoutes.tasks.main,
        {
          title: title,
          deadline: new Date(deadline) ,
          status: status,
          description: description, 
        },
        {
          params: {
            taskID: taskID,
          },
          headers: {
            Authorization: `Bearer ${authContext?.user?.token}`,
            withCredentials: true,
          },
        }
      )
      .then((res) => {
        // console.log(res.data.message);
        getGroupData(authContext?.user as userProps);
        toast.success(res.data.message);

      })
      .catch((err) => {
        toast.error("Task update failed");
        // console.log(err);
      });
  };
  const createTask = ({
    groupID,
    title,
    deadline,
    status,
    description,
    
  }: {
    groupID: string;
    title: string;
    deadline: Date;
    status: string;
    description: string;
  }) => {
    toast("Creating task...");
    axios
      .post(
        apiRoutes.tasks.main,
        {
          title: title,
          deadline: new Date(deadline) ,
          status: status,
          description: description, 
        },
        {
          params: {
            groupID: groupID,
          },
          headers: {
            Authorization: `Bearer ${authContext?.user?.token}`,
            withCredentials: true,
          },
        }
      )
      .then((res) => {
        // console.log(res.data.message);
        getGroupData(authContext?.user as userProps);
        toast.success(res.data.message);

      })
      .catch((err) => {
        toast.error("Task creation failed");
        // console.log(err);
      });
  };
  const deleteTask = ({
    taskID,
  }: {
    taskID: string;
  }) => {
    toast("Deleting task...");
    axios
      .delete(
        apiRoutes.tasks.main,
        {
          params: {
            taskID: taskID,
          },
          headers: {
            Authorization: `Bearer ${authContext?.user?.token}`,
            withCredentials: true,
          },
        }
      )
      .then((res) => {
        // console.log(res.data.message);
        getGroupData(authContext?.user as userProps);
        toast.success(res.data.message);

      })
      .catch((err) => {
        toast.error(err);
        // console.log(err);
      });
  };
  const deleteGroup = ({
    groupID,
  }: {
    groupID: string;
  }) => {
    toast("Deleting group...");
    axios
      .delete(
        apiRoutes.groups.main,
        {
          params: {
            groupID: groupID,
          },
          headers: {
            Authorization: `Bearer ${authContext?.user?.token}`,
            withCredentials: true,
          },
        }
      )
      .then((res) => {
        // console.log(res.data.message);
        getGroupData(authContext?.user as userProps);
        toast.success(res.data.message)

      })
      .catch((err) => {
        toast.error(err);
        // console.log(err);
      });
  };





  useEffect(() => {
    if (authContext?.user && pageOpen) {
       getGroupData(authContext.user); 
       getCountTask(authContext.user);
       fetchTasks();
    }
  }, [authContext?.user, getGroupData, taskTemp, pageOpen, groupTemp, modal, getCountTask, fetchTasks]);


  return (
    <MainContext.Provider
      value={{
        pageOpen,
        setPageOpen,
        group,
        setGroup,
        groupList: group,
        updateGroup,
        createGroup,
        deleteGroup,
        groupTemp,
        setGroupTemp,
        task,
        setTask,
        modal,
        setModal,
        fetchTasks,
        taskTemp,
        setTaskTemp,
        updateTask,
        createTask,
        deleteTask,
        taskList,
        eventList,
        modalType,
        setModalType,
        countTask,
        setCountTask
      }}
    >
      {modal && (
          <div className="w-screen h-screen fixed flex justify-center items-center bg-black z-10">
            <ModalForm show={modal} type={modalType as "create" | "update" | "create-calendar"} groupList={group}/>
          </div>
      )}
      {children}
    </MainContext.Provider>
  );
}

export const useMainContext = () => useContext(MainContext);
