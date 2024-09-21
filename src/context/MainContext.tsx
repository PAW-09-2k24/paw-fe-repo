"use client";
import { createContext, useContext, useState } from "react";

interface MainContextProps {
  pageOpen: string;
  setPageOpen: React.Dispatch<React.SetStateAction<string>>;
}

const MainContext = createContext<MainContextProps | undefined>(undefined);

export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pageOpen, setPageOpen] = useState<string>("grup 1");
  return (
    <MainContext.Provider value={{ pageOpen, setPageOpen }}>
      {children}
    </MainContext.Provider>
  );
}

export const useMainContext = () => useContext(MainContext);
