import React from "react";
import ForgotPassword from "@/components/Auth/ForgotPassword";
import Heading from "@/utils/Heading";

const page = () => {
  return (
    <>
      <Heading
        title="Orbit Blog | Forgot Password"
        description="OrbitBlog is a blog site with good looking UI design."
        keywords="OrbitBlog, forgot, forgotpassword, password,reset"
      />
      <ForgotPassword />
    </>
  );
};

export default page;
