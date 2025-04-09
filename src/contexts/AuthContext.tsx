import React, {createContext, useState, useEffect, ReactNode} from "react";
import { getToken, setToken, removeToken } from "../services/storage/token";

interface AuthContextProps{
    token: string | null;
    login: (jwt: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
    token: null,
    login: async () => {},
    logout: async () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setTokenState] = useState<string | null>(null);
  
    useEffect(() => {
      (async () => {
        const storedToken = await getToken();
        setTokenState(storedToken);
      })();
    }, []);
  
    const login = async (jwt: string) => {
      await setToken(jwt);
      setTokenState(jwt);
    };
  
    const logout = async () => {
      await removeToken();
      setTokenState(null);
    };
  
    return (
      <AuthContext.Provider value={{ token, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
};
