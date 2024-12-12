"use client";

import AuthorOrAdminProtected from "@/app/hooks/useAuthorProtected";
import Protected from "@/app/hooks/useProtected";
import Analytics from "@/components/Author/Analytics";
import Header from "@/components/Header";
import { getLoggedUser } from "@/state/api/auth/authSlice";
import Heading from "@/utils/Heading";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
  const user = useSelector(getLoggedUser);
  return (
    <>
      <Protected>
        <AuthorOrAdminProtected>
          <Heading
            title={user?.name}
            description="Author analytics section"
            keywords="OrbitBlog, Blog, Orbit, author, analytics"
          />
          <Header />
          <Analytics user={user} />
        </AuthorOrAdminProtected>
      </Protected>
    </>
  );
};

export default page;
