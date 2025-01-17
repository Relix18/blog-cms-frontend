import Dashboard from "@/components/Admin/Dashboard";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading
        title="Admin | Dashboard"
        description="OrbitBlog is a blog site with good looking UI design."
        keywords="OrbitBlog, dashboard, admin, admindashbaord"
      />
      <Dashboard />
    </>
  );
};

export default page;
