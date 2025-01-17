import Category from "@/components/Admin/Post-Management/Category";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading
        title="Admin | Categories"
        description="OrbitBlog is a blog site with good looking UI design."
        keywords="OrbitBlog, admin, categories, dashboard"
      />
      <Category />
    </>
  );
};

export default page;
