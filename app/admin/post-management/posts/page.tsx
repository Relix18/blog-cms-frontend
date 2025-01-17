import Posts from "@/components/Admin/Post-Management/Posts";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading
        title="Admin | Posts"
        description="OrbitBlog is a blog site with good looking UI design."
        keywords="OrbitBlog, posts, allposts, admin, dashboard"
      />
      <Posts />
    </>
  );
};

export default page;
