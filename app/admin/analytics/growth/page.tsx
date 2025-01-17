import GrowthReport from "@/components/Admin/Analytics/Growth/GrowthReport";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading
        title="Admin | Growth Report"
        description="OrbitBlog is a blog site with good looking UI design."
        keywords="OrbitBlog, admin, growth, growthreport,report"
      />
      <GrowthReport />
    </>
  );
};

export default page;
