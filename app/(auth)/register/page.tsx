import Signup from "@/components/Auth/Signup";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading
        title="Orbit Blog | Sign Up"
        description="OrbitBlog is a blog site with good looking UI design."
        keywords="OrbitBlog, signup, register, create,account"
      />
      <Signup />
    </>
  );
};

export default page;
