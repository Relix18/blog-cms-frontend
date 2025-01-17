import Notification from "@/components/Admin/Settings/Notification";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading
        title="Admin | Notifications"
        description="OrbitBlog is a blog site with good looking UI design."
        keywords="OrbitBlog, notificatons, allnotifications, admin,dashboard"
      />
      <Notification />
    </>
  );
};

export default page;
