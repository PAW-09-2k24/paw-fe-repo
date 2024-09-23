/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { groupProps, taskGroupCountProps, taskProps, userProps } from "@/types/types";
import axios from "axios";
import { apiRoutes } from "@/API/routes";
import { useAuthContext } from "./AuthContext";
import ModalForm from "@/components/ModalForm";

interface MainContextProps {
  pageOpen: string;
  setPageOpen: React.Dispatch<React.SetStateAction<string>>;
  group: groupProps[];
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
  modalType: "create" | "update" | "";
  setModalType: React.Dispatch<React.SetStateAction<"create" | "update">>;
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
  console.log("USER BANG:", authContext?.user);
  const [group, setGroup] = useState<groupProps[]>([]);
  const [groupTemp, setGroupTemp] = useState<groupProps | undefined>(undefined);
  const [task, setTask] = useState<taskProps[] | undefined>(undefined);
  const [taskTemp, setTaskTemp] = useState<taskProps | undefined>(undefined);
  const [pageOpen, setPageOpen] = useState<string>("to do");
  const [modal, setModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"create" | "update" >("update");
  const [countTask, setCountTask] = useState<taskGroupCountProps>();

  const getGroupData = useCallback((user: userProps) => {
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
        console.log(res.data.message);
        console.log(groupData);
        setGroup(groupData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
        console.log(res.data.message);
        getGroupData(authContext?.user as userProps);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createGroup = ({
    userID,
    groupTitle,
  }: {
    userID: string;
    groupTitle: string;
  }) => {
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
        console.log(res.data.message);
        getGroupData(authContext?.user as userProps);

      })
      .catch((err) => {
        console.log(err);
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
        console.log(res.data.message);
        getGroupData(authContext?.user as userProps);

      })
      .catch((err) => {
        console.log(err);
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
        console.log(res.data.message);
        getGroupData(authContext?.user as userProps);

      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteTask = ({
    taskID,
  }: {
    taskID: string;
  }) => {
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
        console.log(res.data.message);
        getGroupData(authContext?.user as userProps);

      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteGroup = ({
    groupID,
  }: {
    groupID: string;
  }) => {
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
        console.log(res.data.message);
        getGroupData(authContext?.user as userProps);

      })
      .catch((err) => {
        console.log(err);
      });
  };





  useEffect(() => {
    if (authContext?.user && pageOpen) {
       getGroupData(authContext.user); 
       getCountTask(authContext.user);
    }
  }, [authContext?.user, getGroupData, taskTemp, pageOpen, groupTemp, modal, getCountTask]);


  return (
    <MainContext.Provider
      value={{
        pageOpen,
        setPageOpen,
        group,
        setGroup,
        updateGroup,
        createGroup,
        deleteGroup,
        groupTemp,
        setGroupTemp,
        task,
        setTask,
        modal,
        setModal,
        taskTemp,
        setTaskTemp,
        updateTask,
        createTask,
        deleteTask,
        modalType,
        setModalType,
        countTask,
        setCountTask
      }}
    >
      {modal && (
          <div className="w-screen h-screen fixed flex justify-center items-center bg-black z-10">
            <ModalForm show={modal} type={modalType as "create" | "update"}/>
          </div>
      )}
      {children}
    </MainContext.Provider>
  );
}

export const useMainContext = () => useContext(MainContext);
