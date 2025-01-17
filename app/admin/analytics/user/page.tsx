import UserAnalytics from "@/components/Admin/Analytics/User/UserAnalytics";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading
        title="Admin | User Analytics"
        description="OrbitBlog is a blog site with good looking UI design."
        keywords="OrbitBlog, users, useranalytics, analytics"
      />
      <UserAnalytics />
    </>
  );
};

export default page;
