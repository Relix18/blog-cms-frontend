import AuthorOrAdminProtected from "@/app/hooks/useAuthorProtected";
import Header from "@/components/Header";
import EditPost from "@/components/Post/EditPost/EditPost";
import Heading from "@/utils/Heading";
import React from "react";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  return (
    <>
      <AuthorOrAdminProtected>
        <Heading
          title={"Edit Post"}
          description="OrbitBlog is a blog site with good looking UI design."
          keywords="Blog, Teck, Future "
        />
        <Header />
        <EditPost slug={slug} />
      </AuthorOrAdminProtected>
    </>
  );
};

export default page;
