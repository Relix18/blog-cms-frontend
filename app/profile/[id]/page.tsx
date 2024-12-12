"use client";
import Header from "@/components/Header";
import Loader from "@/components/Loader/Loader";
import AuthorProfile from "@/components/Profile/AuthorProfile";
import { getLoggedUser } from "@/state/api/auth/authSlice";
import { useGetAuthorProfileQuery } from "@/state/api/user/userApi";
import Heading from "@/utils/Heading";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  const user = useSelector(getLoggedUser);
  const router = useRouter();

  const { data: authorProfile, isLoading } = useGetAuthorProfileQuery(id);

  const author = authorProfile?.author;

  if (user?.id === id) {
    router.push("/profile");
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Heading
        title={`${author?.name} Author Profile`}
        description={`${author?.profile.bio}`}
        keywords="Orbit Blog, Blog, profile, author"
      />
      <Header />
      <AuthorProfile user={author} />
    </>
  );
};

export default Page;
