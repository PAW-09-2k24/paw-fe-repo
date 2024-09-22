"use client";
import { createContext, useContext, useState } from "react";
import { groupProps } from "@/types/types";
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
  const [group, setGroup] = useState<groupProps[]>([]);
  const [pageOpen, setPageOpen] = useState<string>("to do");

  const getGroup = async () => {
    axios.get(apiRoutes.groups.user,{
      headers: {
        Authorization: `Bearer ${authContext?.user?.token}`,
      },
      params:{
        userID: authContext?.user?.id,
      }
    }).then((res) => {
      const group = res.data.data;
      console.log(res.data.message);
      setGroup(group);
    }).catch((err) => {
      console.log(err);
    });
  }

  

  return (
    <MainContext.Provider value={{ pageOpen, setPageOpen, group, setGroup }}>
      {children}
    </MainContext.Provider>
  );
}

export const useMainContext = () => useContext(MainContext);
