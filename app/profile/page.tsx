"use client";
import Header from "@/components/Header";
import Profile from "@/components/Profile/Profile";
import React from "react";
import Protected from "../hooks/useProtected";
import Heading from "@/utils/Heading";
import useAuth from "../hooks/useAuth";

const page = () => {
  const { user } = useAuth();

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
