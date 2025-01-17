import ContactPage from "@/components/Contact/Contact";
import Header from "@/components/Header";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading
        title="Contact Us"
        description="OrbitBlog is a blog site with good looking UI design."
        keywords="OrbitBlog, contactus, contactpage, contact"
      />
      <Header active={3} />
      <ContactPage />
    </>
  );
};

export default page;
