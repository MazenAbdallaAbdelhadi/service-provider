import {
  useContext,
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import * as SecureStore from "expo-secure-store";
import { User } from "@/lib/interfaces/user";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/api/profile-api";

interface IAuthContext {
  authState: {
    isAuth: boolean;
    user: User | null;
  };
  isLoading: boolean;
  storeToken: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const authContext = createContext<IAuthContext | null>(null);

type Props = PropsWithChildren;

const AuthProvider = ({ children }: Props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  useEffect(() => {
    if (data?.data) {
      setUser(data?.data.data!);
      setIsAuth(true);
    }
  }, [data]);

  const storeToken = async (token: string) => {
    try {
      await SecureStore.setItemAsync("token", token);
    } catch (error) {
      console.log("ERROR: ERROR IN STORING TOKEN:", error);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      setUser(null);
      setIsAuth(false);
      console.log("logout");
    } catch (error) {
      console.log("ERROR: ERROR IN LOGOUT:", error);
    }
  };

  const value = {
    authState: {
      isAuth,
      user: user,
    },
    isLoading,
    storeToken,
    logout,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

const useAuth = () => {
  const auth = useContext(authContext);

  if (auth === null)
    throw new Error("useAuth must be used inside AuthProvider");

  return auth;
};

export { AuthProvider, useAuth };
