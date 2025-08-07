"use client";
import { createContext, useEffect, useState } from "react";

interface AuthContextType {
  username: string | null;
  jobTitle: string | null;
  setUserInfo: (username: string | null, jobTitle: string | null) => void;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType>({
  username: null,
  jobTitle: null,
  setUserInfo: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [username, setUsername] = useState<string | null>(null);
  const [jobTitle, setJobTitle] = useState<string | null>(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const jobTitle = localStorage.getItem("jobTitle");

    if (username && jobTitle) {
      setUsername(username);
      setJobTitle(jobTitle);
    }
  }, []);

  const setUserInfo = (username: string | null, jobTitle: string | null) => {
    if (username && jobTitle) {
      localStorage.setItem("username", username);
      localStorage.setItem("jobTitle", jobTitle);
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("jobTitle");
    }
    setUsername(username);
    setJobTitle(jobTitle);
  };

  const contextValue = {
    username,
    jobTitle,
    setUserInfo,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
export default AuthContext;
