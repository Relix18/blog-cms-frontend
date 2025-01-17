import UserDetail from "@/components/Admin/User-Management/UserDetail";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading
        title="User | User Details"
        description="OrbitBlog is a blog site with good looking UI design."
        keywords="OrbitBlog, user, userdetail, details,admin"
      />
      <UserDetail />
    </>
  );
};

export default page;
