"use client";
import { userProps } from "@/types/types";
import { useState, createContext, useContext, useEffect, useRef } from "react";
import { apiRoutes } from "@/API/routes";
import axios from "axios";
import { useRouter } from "next/navigation";
import cookiesHandler from "@/API/cookiesHandler";
import logoutHandler from "@/API/logoutHandler";
interface AuthContextProps {
  user: userProps | undefined;
  setUser: React.Dispatch<React.SetStateAction<userProps | undefined>>;
  onLogin: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => void;
  onLogout: () => void;
  onRegister: ({username, password}: {username: string, password: string}) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<userProps | undefined>(undefined);
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
        const userData = res.data.data;
        const token = res.data.token;
        setUser({
          id: userData.id,
          username: userData.username,
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
    setUser(undefined);
    router.push("/");
  };

  const getCookies =  async () => {
    const token = await cookiesHandler();
    if (token) {
      const userData = parseJWT(token);
      setUser({
        id: userData.id,
        username: userData.username,
        token: token,
      }); 
      console.log("USER: ",userData);
      console.log("TOKEN: ",token);
    }
    else {
      router.push("/");
    }
    return token;
  };


  const onRegister = ({username, password}: {username: string, password: string}) => {
    axios.post(apiRoutes.auth.register, {username, password})
    .then((res) => {
      console.log(res.data.message);
      router.push("/");
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const getCookiesRef = useRef(getCookies);
  
  useEffect(() => {
    if (router) getCookiesRef.current();
  },[router]);

  return (
    <AuthContext.Provider value={{ user, setUser, onLogin, onLogout, onRegister }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);