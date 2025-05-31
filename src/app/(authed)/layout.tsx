"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthedLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      axios.defaults.headers.common.authorization = undefined;
      router.push("/login");
    } else {
      axios.defaults.headers.common.authorization = `Bearer ${token}`;
      setIsMounted(true);
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  return <div>{children}</div>;
};

export default AuthedLayout;
