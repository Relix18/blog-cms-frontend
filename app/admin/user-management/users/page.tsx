import Users from "@/components/Admin/User-Management/Users";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading
        title="Admin | All User"
        description="OrbitBlog is a blog site with good looking UI design."
        keywords="OrbitBlog, users, alluser, admin,dashboard"
      />
      <Users />
    </>
  );
};

export default page;
