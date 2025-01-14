"use client";

import React from "react";
import MultiplePost from "./MultiplePosts";
import SinglePost from "./SinglePost";
import { useGetPostAnalyticsQuery } from "@/state/api/analytics/analyticsApi";
import Loader from "@/components/Loader/Loader";
import { Separator } from "@/components/ui/separator";
import PostChart from "./PostChart";

export default function PostAnalytics() {
  const { data, isLoading } = useGetPostAnalyticsQuery({});

  if (isLoading) return <Loader />;

  return (
    <div className="container m-auto rounded-lg px-4 py-8 min-h-screen">
      <PostChart posts={data?.PostAnalytics} />
      <MultiplePost posts={data?.PostAnalytics} />
      <Separator />
      <SinglePost posts={data?.PostAnalytics} />
    </div>
  );
}
