"use client";
import { useGetCategoryQuery, useGetTagsQuery } from "@/state/api/post/postApi";
import React from "react";

type Props = {};

const CatTag = (props: Props) => {
  const { data: tags } = useGetTagsQuery({});
  const { data: category } = useGetCategoryQuery({});
  console.log(tags, category);

  return <div>Hello</div>;
};

export default CatTag;
