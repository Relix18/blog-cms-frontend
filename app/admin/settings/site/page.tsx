import SiteSettings from "@/components/Admin/Settings/SiteSettings";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading
        title="Admin | Site Settings"
        description="OrbitBlog is a blog site with good looking UI design."
        keywords="OrbitBlog, settings, sitesettings, site,admin, dashboard"
      />
      <SiteSettings />
    </>
  );
};

export default page;
