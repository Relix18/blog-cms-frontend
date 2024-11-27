import { redirect } from "next/navigation";
import useAuth from "./useAuth";
import React from "react";

interface props {
  children: React.ReactNode;
}

const AdminProtected = ({ children }: props) => {
  const { user } = useAuth();

  return user?.role === "ADMIN" ? children : redirect("/");
};

export default AdminProtected;
