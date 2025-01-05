import React, { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  DetailedPlatformUserAnalytics,
  MonthlyUserActivity,
} from "@/types/types";
import { format } from "date-fns";

const chartConfig: ChartConfig = {
  newUsers: {
    label: "New User",
    color: "hsl(var(--chart-1))",
  },
  activeUsers: {
    label: "Active User",
    color: "hsl(var(--chart-2))",
  },
  views: {
    label: "Views",
    color: "hsl(var(--chart-3))",
  },
  likes: {
    label: "Likes",
    color: "hsl(var(--chart-4))",
  },
};

type Props = {
  users: DetailedPlatformUserAnalytics;
};

const UserChart = ({ users }: Props) => {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("newUsers");

  const total = useMemo(() => {
    if (!users?.monthlyActivity?.length) {
      return { newUsers: 0, activeUsers: 0, views: 0, likes: 0 };
    }

    return users.monthlyActivity.reduce(
      (acc, curr) => ({
        newUsers: acc.newUsers + (curr.newUsers || 0),
        activeUsers: acc.activeUsers + (curr.activeUsers || 0),
        views: acc.views + (curr.interactions?.views || 0),
        likes: acc.likes + (curr.interactions?.likes || 0),
      }),
      { newUsers: 0, activeUsers: 0, views: 0, likes: 0 }
    );
  }, [users]);

  const getDataKey = (key: keyof typeof chartConfig) => {
    if (key === "views" || key === "likes") {
      return (dataPoint: MonthlyUserActivity) =>
        dataPoint.interactions?.[key] || 0;
    }
    return key;
  };

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>User Analytics</CardTitle>
          <CardDescription>
            Showing total engagement for the last 6 months
          </CardDescription>
        </div>
        <div className="flex">
          {["newUsers", "activeUsers", "views", "likes"].map((key) => {
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
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="w-full max-h-[300px]">
          <BarChart
            accessibilityLayer
            data={users?.monthlyActivity}
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
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  const value =
                    activeChart === "views" || activeChart === "likes"
                      ? data.interactions?.[activeChart]
                      : data[activeChart];
                  return (
                    <div className="rounded-lg bg-white p-2 shadow-md">
                      <p className="text-sm font-semibold text-gray-700">
                        {format(data.month, "MMMM yyyy")}
                      </p>
                      <p className="text-sm text-gray-600">
                        {chartConfig[activeChart].label}: {value}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey={getDataKey(activeChart)}
              fill={`var(--color-${activeChart})`}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {`${format(users.monthlyActivity[0].month, "MMMM")} - ${format(
                users.monthlyActivity[users.monthlyActivity.length - 1].month,
                "MMMM yy"
              )}`}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserChart;
