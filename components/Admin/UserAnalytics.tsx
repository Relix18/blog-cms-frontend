"use client";
import { useGetUserAnalyticsQuery } from "@/state/api/analytics/analyticsApi";
import React from "react";
import UserChart from "./UserChart";
import Loader from "../Loader/Loader";

const UserAnalytics = () => {
  const { data, isLoading } = useGetUserAnalyticsQuery({});
  console.log(data);

  if (isLoading) return <Loader />;

  return (
    <div className="container m-auto rounded-lg px-4 py-8 min-h-screen">
      <UserChart users={data?.UserAnalytics} />
    </div>
  );
};

export default UserAnalytics;
