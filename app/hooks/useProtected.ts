import { redirect } from "next/navigation";
import useAuth from "./useAuth";
import React from "react";

interface props {
  children: React.ReactNode;
}

const Protected = ({ children }: props) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : redirect("/");
};

export default Protected;
