import AuthorOrAdminProtected from "@/app/hooks/useAuthorProtected";
import Header from "@/components/Header";
import EditPost from "@/components/Post/EditPost/EditPost";
import Heading from "@/utils/Heading";
import React, { FC } from "react";

type Props = {};

const page: FC<Props> = ({ params }: any) => {
  return (
    <>
      <AuthorOrAdminProtected>
        <Heading
          title={"Edit Post"}
          description="OrbitBlog is a blog site with good looking UI design."
          keywords="Blog, Teck, Future "
        />
        <Header />
        <EditPost slug={params?.slug} />
      </AuthorOrAdminProtected>
    </>
  );
};

export default page;
