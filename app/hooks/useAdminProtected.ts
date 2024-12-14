"use client";
import { redirect } from "next/navigation";
import React from "react";
import { getLoggedUser } from "@/state/api/auth/authSlice";
import { useSelector } from "react-redux";

interface props {
  children: React.ReactNode;
}

const useAdminProtected = ({ children }: props) => {
  const user = useSelector(getLoggedUser);

  return user?.role === "ADMIN" ? children : redirect("/");
};

export default useAdminProtected;
