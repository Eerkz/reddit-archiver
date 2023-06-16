import React, { useState, createContext, useContext, useEffect } from "react";
import { RedditIdentity } from "../types/RedditUser";

const useUserController = (
  rawUser: RedditIdentity | undefined,
  access_token: string | undefined,
  rawError: string | undefined
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(() => access_token);
  const [user, setUser] = useState<RedditIdentity | undefined>();

  const toggleLoading = (bool: boolean) => {
    setIsLoading(bool);
  };

  const setUserData = (user: any) => {
    setUser(user);
  };

  const setToken = (token: string) => {
    setAccessToken(token);
  };

  const clearUser = () => {
    setAccessToken(undefined);
    setUser(undefined);
  };

  useEffect(() => {
    setUser(rawUser);
  }, [rawUser]);

  return {
    clearUser,
    toggleLoading,
    setUserData,
    isLoading,
    user,
    accessToken,
    setToken,
  };
};

export const UserContext = createContext<ReturnType<typeof useUserController>>({
  user: undefined,
  isLoading: false,
  toggleLoading: (bool) => {},
  setUserData: (user) => {},
  accessToken: "",
  setToken: (token) => {},
  clearUser: () => {},
});

export const UserProvider = ({
  user,
  access_token,
  error,
  children,
}: {
  user: RedditIdentity | undefined;
  access_token: string | undefined;
  error: string | undefined;
  children: React.ReactNode;
}) => {
  const values = useUserController(user, access_token, error);

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useCurrentUser = () => useContext(UserContext);
