import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import api from "../lib/api";
import { API_ENDPOINTS } from "../config/endpoints";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: any, token: string) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (userData: any, token: string) => {
    setUser(userData);
    setToken(token);
    sessionStorage.removeItem("hasSeenWelcomePopup");
    Cookies.set("admin_token", token, {
      expires: 30,
      secure: true,
      sameSite: "strict",
    });
    Cookies.set("admin_user", JSON.stringify(userData), {
      expires: 30,
      secure: true,
      sameSite: "strict",
    });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    Cookies.remove("admin_token");
    Cookies.remove("admin_user");
  };

  const checkAuth = async () => {
    const savedToken = Cookies.get("admin_token");
    const savedUser = Cookies.get("admin_user");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        // Optional: Verify token with backend
        // await api.get(API_ENDPOINTS.AUTH.PROFILE);
      } catch (error) {
        logout();
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
