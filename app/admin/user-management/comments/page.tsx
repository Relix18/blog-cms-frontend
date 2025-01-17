import Comments from "@/components/Admin/User-Management/Comments";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading
        title="Admin | Comments"
        description="OrbitBlog is a blog site with good looking UI design."
        keywords="OrbitBlog, comments, replies, admin,dashboard"
      />
      <Comments />
    </>
  );
};

export default page;
