import Filter from "@/components/Filter/Filter";
import Header from "@/components/Header";
import Heading from "@/utils/Heading";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <Heading
        title={"Filter Posts"}
        description="OrbitBlog is a blog site with good looking UI design."
        keywords="Orbit Blog, Blog, Tech, Travel, Future, Food"
      />
      <Header />
      <Filter />
    </>
  );
};

export default page;
