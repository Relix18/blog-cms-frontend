"use client";

import AuthorOrAdminProtected from "@/app/hooks/useAuthorProtected";
import Analytics from "@/components/Author/Analytics";
import { getLoggedUser } from "@/state/api/auth/authSlice";
import Heading from "@/utils/Heading";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
  const user = useSelector(getLoggedUser);
  return (
    <>
      <AuthorOrAdminProtected>
        <Heading
          title={user?.name}
          description="Author analytics section"
          keywords="OrbitBlog, Blog, Orbit, author, analytics"
        />
        <Analytics user={user} />
      </AuthorOrAdminProtected>
    </>
  );
};

export default page;
