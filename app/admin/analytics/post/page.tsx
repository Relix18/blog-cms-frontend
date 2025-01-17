import PostAnalytics from "@/components/Admin/Analytics/Post/PostAnalytics";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading
        title="Admin | Post Analytics"
        description="OrbitBlog is a blog site with good looking UI design."
        keywords="OrbitBlog, posts, postsanalytics, analytics"
      />
      <PostAnalytics />
    </>
  );
};

export default page;
