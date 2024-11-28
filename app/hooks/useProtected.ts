import { redirect } from "next/navigation";
import React from "react";
import useAuth from "./useAuth";

interface props {
  children: React.ReactNode;
}

const Protected = ({ children }: props) => {
  const isAuthenticated = useAuth();

  return isAuthenticated ? children : redirect("/");
};

export default Protected;
