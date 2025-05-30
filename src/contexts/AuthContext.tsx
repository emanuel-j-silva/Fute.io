import React, {createContext, useState, useEffect, ReactNode} from "react";
import { getToken, setToken, removeToken } from "../services/storage/token";

interface AuthContextProps{
    token: string | null;
    login: (jwt: string) => Promise<void>;
    logout: () => Promise<void>;
    isLoadingAuth: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
    token: null,
    login: async () => {},
    logout: async () => {},
    isLoadingAuth: true
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setTokenState] = useState<string | null>(null);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  
    useEffect(() => {
      const loadInitialToken = async () => {
            try {
                const storedToken = await getToken();
                setTokenState(storedToken);
            } catch (error) {
                console.error("AuthContext: Erro ao carregar token inicial:", error);
            } finally {
                setIsLoadingAuth(false);
            }
        };
        loadInitialToken();
    }, []);

    const login = async (jwt: string) => {
        try {
            await setToken(jwt);
            setTokenState(jwt);
        } catch (error) {
            console.error("AUTH_CONTEXT: Erro na função login (do contexto):", error);
        }
    };
  
    const logout = async () => {
        await removeToken();
        setTokenState(null);
    };
  
    return (
      <AuthContext.Provider value={{ token, login, logout, isLoadingAuth }}>
        {children}
      </AuthContext.Provider>
    );
};
