"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useLogin,
  useRegister,
  useGetCurrentUser,
} from "@/generated-api/auth-controller/auth-controller";
import { useGetUserMe } from "@/generated-api/user-controller/user-controller";
import type { AuthRequest, UserDto } from "@/generated-api/schemas";

interface AuthContextType {
  user: UserDto | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: AuthRequest) => Promise<void>;
  register: (credentials: AuthRequest) => Promise<void>;
  logout: () => void;
  refetchUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // API hooks
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const { data: currentUserData, refetch: refetchCurrentUser } =
    useGetCurrentUser({
      query: {
        enabled: false, // Only fetch when we have a token
      },
    });
  const { data: userMeData, refetch: refetchUserMe } = useGetUserMe({
    query: {
      enabled: false, // Only fetch when we have a token
    },
  });

  // Get user data from either endpoint, casting to UserDto since the generated types are generic
  const user =
    (userMeData?.data as unknown as UserDto) ||
    (currentUserData?.data as unknown as UserDto) ||
    null;

  useEffect(() => {
    // Check if user is authenticated on mount
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
      // Try to fetch user data
      refetchCurrentUser();
      refetchUserMe();
    }
    setIsLoading(false);
  }, [refetchCurrentUser, refetchUserMe]);

  const login = async (credentials: AuthRequest) => {
    try {
      const response = await loginMutation.mutateAsync({ data: credentials });
      const authData = response.data;

      // Store token (assuming it's in the response)
      if (authData.token) {
        localStorage.setItem("authToken", authData.token);
        setIsAuthenticated(true);

        // Fetch user data after successful login
        refetchCurrentUser();
        refetchUserMe();

        router.push("/hackathons");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (credentials: AuthRequest) => {
    try {
      const response = await registerMutation.mutateAsync({
        data: credentials,
      });
      const authData = response.data;

      // Store token (assuming it's in the response)
      if (authData.token) {
        localStorage.setItem("authToken", authData.token);
        setIsAuthenticated(true);

        // Fetch user data after successful registration
        refetchCurrentUser();
        refetchUserMe();

        router.push("/hackathons");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    router.push("/");
  };

  const refetchUser = () => {
    refetchCurrentUser();
    refetchUserMe();
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    refetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
