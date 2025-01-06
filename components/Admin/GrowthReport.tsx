"use client";
import { useGetGrowthReportsQuery } from "@/state/api/analytics/analyticsApi";
import React from "react";
import GrowthChart from "./GrowthChart";
import Loader from "../Loader/Loader";

const GrowthReport = () => {
  const { data, isLoading } = useGetGrowthReportsQuery({});

  if (isLoading) return <Loader />;
  console.log(data);
  return (
    <div className="container m-auto rounded-lg px-4 py-8 min-h-screen">
      <GrowthChart
        userGrowth={data?.GrowthReport.userGrowth}
        postGrowth={data?.GrowthReport.postGrowth}
      />
    </div>
  );
};

export default GrowthReport;
