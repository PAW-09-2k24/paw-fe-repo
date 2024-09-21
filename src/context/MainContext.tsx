"use client";
import { createContext, useContext, useState } from "react";
import { groupProps } from "@/types/types";

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
  const [group, setGroup] = useState<groupProps[]>([]);
  const [pageOpen, setPageOpen] = useState<string>("to do");
  return (
    <MainContext.Provider value={{ pageOpen, setPageOpen, group, setGroup }}>
      {children}
    </MainContext.Provider>
  );
}

export const useMainContext = () => useContext(MainContext);
