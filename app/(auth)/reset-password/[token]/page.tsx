"use client";
import ResetPassword from "@/components/Auth/ResetPassword";
import Heading from "@/utils/Heading";
import React from "react";

interface Props {
  params: Promise<{ token: string }>;
}

const Page = ({ params }: Props) => {
  const { token } = React.use(params);

  return (
    <>
      <Heading
        title="Orbit Blog | Reset Password"
        description="OrbitBlog is a blog site with good looking UI design."
        keywords="OrbitBlog, reset, resetpassword, password, change"
      />
      <ResetPassword token={token} />
    </>
  );
};

export default Page;
