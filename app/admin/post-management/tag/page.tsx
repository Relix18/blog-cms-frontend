import Tag from "@/components/Admin/Post-Management/Tag";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading
        title="Admin | Tags"
        description="OrbitBlog is a blog site with good looking UI design."
        keywords="OrbitBlog, tags, dashboard, admin"
      />
      <Tag />
    </>
  );
};

export default page;
