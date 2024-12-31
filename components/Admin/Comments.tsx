"use client";
import { useGetAllCommentsQuery } from "@/state/api/user/userApi";
import React from "react";

type Props = {};

const Comments = (props: Props) => {
  const { data } = useGetAllCommentsQuery({});
  console.log(data);
  return <div>Comments</div>;
};

export default Comments;
