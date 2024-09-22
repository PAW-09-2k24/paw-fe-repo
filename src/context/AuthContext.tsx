"use client";
import { userProps } from "@/types/types";
import { useState, createContext, useContext, useEffect, useRef } from "react";
import { apiRoutes } from "@/API/routes";
import axios from "axios";
import { useRouter } from "next/navigation";
import cookiesHandler from "@/API/cookiesHandler";
import logoutHandler from "@/API/logoutHandler";
interface AuthContextProps {
  user: userProps | null;
  setUser: React.Dispatch<React.SetStateAction<userProps | null>>;
  onLogin: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => void;
  onLogout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<userProps | null>(null);
  const onLogin = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    axios
      .post(
        apiRoutes.auth.login,
        { username, password },
        { withCredentials: true }
      )
      .then((res) => {
        const user = res.data.data;
        const token = res.data.token;
        setUser({
          id: user.id,
          username: user.username,
          token: token,
        });
        console.log(res.data.message);
        router.push("/to-do");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const parseJWT = (token: string) => {
    if (!token) {return ;}
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  const onLogout = async () => {
    await logoutHandler();
    setUser(null);
    router.push("/");
  };

  const getCookies =  async () => {
    const token = await cookiesHandler();
    if (token) {
      const user = parseJWT(token);
      console.log("USER: ",user);
      setUser({
        id: user.id,
        username: user.username,
      });
      router.push("/to-do");
    }
    else {
      router.push("/");
    }
    return token;
  };

  const getCookiesRef = useRef(getCookies);
  

  useEffect(() => {
    if (router) getCookiesRef.current();
  },[router]);

  return (
    <AuthContext.Provider value={{ user, setUser, onLogin, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
