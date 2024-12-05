"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PostDetailLoader } from "@/components/Loader/SkeletonLoader";
import PostDetail from "@/components/Post/ViewPost/PostDetail";
import { useGetPostBySlugQuery } from "@/state/api/post/postApi";
import Heading from "@/utils/Heading";
import React from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function Page({ params }: Props) {
  const { slug } = React.use(params);
  const { data, isLoading } = useGetPostBySlugQuery(slug);

  if (isLoading) {
    return <PostDetailLoader />;
  }

  return (
    <>
      <Heading
        title={data?.post.metaTitle}
        description={data?.post.metaDescription}
        keywords={data?.post.metaKeyword}
      />
      <Header />
      <PostDetail data={data?.post} />
      <Footer />
    </>
  );
}
