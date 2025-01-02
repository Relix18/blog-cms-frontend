import React, { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { MonthlyPostAnalytics } from "@/types/types";
import { format } from "date-fns";

const chartConfig: ChartConfig = {
  views: {
    label: "Views",
    color: "hsl(var(--chart-1))",
  },
  likes: {
    label: "Likes",
    color: "hsl(var(--chart-2))",
  },
  comments: {
    label: "Comments",
    color: "hsl(var(--chart-3))",
  },
  replies: {
    label: "Replies",
    color: "hsl(var(--chart-4))",
  },
  totalEngagement: {
    label: "Total",
    color: "hsl(var(--chart-5))",
  },
};

type Props = {
  posts: MonthlyPostAnalytics;
};

const PostChart = ({ posts }: Props) => {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("views");

  const total = useMemo(
    () => ({
      views: posts.monthlyAnalytics.reduce((acc, curr) => acc + curr.views, 0),
      likes: posts.monthlyAnalytics.reduce((acc, curr) => acc + curr.likes, 0),
      comments: posts.monthlyAnalytics.reduce(
        (acc, curr) => acc + curr.comments,
        0
      ),
      replies: posts.monthlyAnalytics.reduce(
        (acc, curr) => acc + curr.replies,
        0
      ),
      totalEngagement: posts.monthlyAnalytics.reduce(
        (acc, curr) => acc + curr.totalEngagement,
        0
      ),
    }),
    [posts]
  );

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Post Analytics</CardTitle>
          <CardDescription>
            Showing total engagement for the last 6 months
          </CardDescription>
        </div>
        <div className="flex">
          {["views", "likes", "comments", "replies", "totalEngagement"].map(
            (key) => {
              const chart = key as keyof typeof chartConfig;
              return (
                <button
                  key={chart}
                  data-active={activeChart === chart}
                  className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                  onClick={() => setActiveChart(chart)}
                >
                  <span className="text-xs text-muted-foreground">
                    {chartConfig[chart].label}
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    {total[key as keyof typeof total]}
                  </span>
                </button>
              );
            }
          )}
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="w-full max-h-[300px]">
          <BarChart
            accessibilityLayer
            data={posts?.monthlyAnalytics}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return format(value, "MMMM yy");
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
              labelFormatter={(value) => {
                return format(value, "MMMM yy");
              }}
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {`${format(posts.monthlyAnalytics[0].month, "MMMM")} - ${format(
                posts.monthlyAnalytics[posts.monthlyAnalytics.length - 1].month,
                "MMMM yy"
              )}`}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostChart;
