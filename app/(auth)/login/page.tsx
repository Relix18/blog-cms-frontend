import Login from "@/components/Auth/Login";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading
        title="Orbit Blog | Login"
        description="OrbitBlog is a blog site with good looking UI design."
        keywords="OrbitBlog, login, account, signin"
      />
      <Login />
    </>
  );
};

export default page;
