"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      axios.defaults.headers.common.authorization = undefined;
      router.push("/login");
    } else {
      axios.defaults.headers.common.authorization = `Bearer ${token}`;
    }
  }, []);

  return <div>{children}</div>;
};

export default AuthedLayout;
