"use client";
import { getLoggedUser } from "@/state/api/auth/authSlice";
import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

interface Props {
  children: React.ReactNode;
}

const AuthorOrAdminProtected = ({ children }: Props) => {
  const user = useSelector(getLoggedUser);

  if (user?.role === "AUTHOR" || user?.role === "ADMIN") {
    return children;
  } else {
    return redirect("/");
  }
};

export default AuthorOrAdminProtected;
