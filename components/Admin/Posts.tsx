"use client";
import { useGetAllPostsQuery } from "@/state/api/post/postApi";
import React from "react";

type Props = {};

const Posts = (props: Props) => {
  const { data } = useGetAllPostsQuery({});

  console.log(data);
  return <div>Posts</div>;
};

export default Posts;
