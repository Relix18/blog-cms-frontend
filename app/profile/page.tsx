"use client";
import Header from "@/components/Header";
import Profile from "@/components/Profile/Profile";
import React from "react";
import Protected from "../hooks/useProtected";
import Heading from "@/utils/Heading";
import { useSelector } from "react-redux";
import { getLoggedUser } from "@/state/api/auth/authSlice";

const page = () => {
  const user = useSelector(getLoggedUser);

  return (
    <>
      <Protected>
        <Heading
          title={`${user?.name} Profile`}
          description="OrbitBlog is a blog site with good looking UI design."
          keywords="Blog, Teck, Future "
        />
        <Header isProfile={user?.role !== "USER"} />
        <Profile />
      </Protected>
    </>
  );
};

export default page;
