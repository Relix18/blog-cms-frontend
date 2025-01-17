import AuthorOrAdminProtected from "@/app/hooks/useAuthorProtected";
import Header from "@/components/Header";
import NewPost from "@/components/Post/NewPost/NewPost";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <AuthorOrAdminProtected>
        <Heading
          title={"Create New Post"}
          description="OrbitBlog is a blog site with good looking UI design."
          keywords="Blog, Teck, Future "
        />
        <Header />
        <NewPost />
      </AuthorOrAdminProtected>
    </>
  );
};

export default page;
