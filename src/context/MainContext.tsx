/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { createContext, use, useCallback, useContext, useEffect, useRef, useState } from "react";
import { groupProps, taskProps, userProps } from "@/types/types";
import axios from "axios";
import { apiRoutes } from "@/API/routes";
import { useAuthContext } from "./AuthContext";

interface MainContextProps {
  pageOpen: string;
  setPageOpen: React.Dispatch<React.SetStateAction<string>>;
  group: groupProps[];
  setGroup: React.Dispatch<React.SetStateAction<groupProps[]>>;
}

const MainContext = createContext<MainContextProps | undefined>(undefined);

export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const authContext = useAuthContext();
  console.log("USER BANG:",authContext?.user);
  const [group, setGroup] = useState<groupProps[]>([]);
  const [groupTemp, setGroupTemp] = useState<groupProps | undefined>(undefined);
  const [task, setTask] = useState<taskProps[] | undefined>(undefined);
  const [taskTemp, setTaskTemp] = useState<taskProps | undefined>(undefined);
  const [pageOpen, setPageOpen] = useState<string>("to do");

  // const groupRef = useRef(setGroup);

  // useEffect(() => {
  //   groupRef.current = setGroup;
  // }, [setGroup]);

  const getGroupData = useCallback((user:userProps) => {
    axios.get(apiRoutes.groups.user,{
      params:{
        userID: user.id,
      },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      
    }).then((res) => {
      const groupData = res.data.data.map((group: groupProps) => {
        return{
          id: group._id,
          title: group.title,
          taskID: group.taskID,
          tasks: group.tasks,
        }
      });
      console.log(res.data.message);
      console.log(groupData);
      setGroup(groupData);
    }).catch((err) => {
      console.log(err);
    });
  },[]);

  // const getGroupDataRef = useRef(getGroupData);

  // useEffect(() => {
  //   getGroupDataRef.current = getGroupData;
  // }, [getGroupData]);

  useEffect(() => {
    if (authContext?.user) {
      pageOpen && getGroupData(authContext.user);
    }
  }, [authContext?.user, getGroupData, taskTemp, pageOpen]);
  
  useEffect(() => {
    console.log("GROUP:",group);
  },[group]);

  return (
    <MainContext.Provider value={{ pageOpen, setPageOpen, group, setGroup }}>
      {children}
    </MainContext.Provider>
  );
}

export const useMainContext = () => useContext(MainContext);
