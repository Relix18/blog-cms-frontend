"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import useAuth from "../hooks/useAuth";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isAuthenticated = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return <div>{children}</div>;
};

export default Layout;
