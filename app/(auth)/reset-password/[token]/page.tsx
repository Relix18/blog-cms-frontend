import ResetPassword from "@/components/Auth/ResetPassword";
import Heading from "@/utils/Heading";
import React from "react";

const page = ({ params }: any) => {
  return (
    <>
      <Heading
        title="Orbit Blog | Reset Password"
        description="OrbitBlog is a blog site with good looking UI design."
        keywords="OrbitBlog, reset, resetpassword, password, change"
      />
      <ResetPassword token={params.token} />
    </>
  );
};

export default page;
