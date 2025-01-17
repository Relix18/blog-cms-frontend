import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  AreaChart,
  Area,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { format } from "date-fns";

type GrowthData = {
  month: string;
  count: number;
  growthRate: number | null;
};

type GrowthChartProps = {
  userGrowth: GrowthData[];
  postGrowth: GrowthData[];
};

const chartConfig: ChartConfig = {
  users: {
    label: "Users",
    color: "hsl(var(--chart-1))",
  },
  posts: {
    label: "Posts",
    color: "hsl(var(--chart-2))",
  },
};

const chartGrowthConfig: ChartConfig = {
  userGrowthRate: {
    label: "User Growth Rate",
    color: "hsl(var(--chart-1))",
  },
  postGrowthRate: {
    label: "Post Growth Rate",
    color: "hsl(var(--chart-2))",
  },
};

const GrowthChart = ({ userGrowth, postGrowth }: GrowthChartProps) => {
  const chartData = useMemo(() => {
    const allMonths = Array.from(
      new Set([...userGrowth, ...postGrowth].map((item) => item.month))
    ).sort();

    return allMonths.map((month) => {
      const user = userGrowth.find((u) => u.month === month) || {
        count: 0,
        growthRate: null,
      };
      const post = postGrowth.find((p) => p.month === month) || {
        count: 0,
        growthRate: null,
      };

      return {
        month,
        users: user.count,
        userGrowthRate: user.growthRate || 0,
        posts: post.count,
        postGrowthRate: post.growthRate || 0,
      };
    });
  }, [userGrowth, postGrowth]);

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>User and Post Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="max-h-[400px] w-full" config={chartConfig}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="fillUser" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-users)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-users)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillPost" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-posts)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-posts)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => format(new Date(value), "MMMM yy")}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) =>
                      format(new Date(value), "MMMM yy")
                    }
                    indicator="dot"
                  />
                }
              />
              <Area
                name="Users"
                dataKey="users"
                type="natural"
                fill="url(#fillUser)"
                stroke="var(--color-users)"
                stackId="a"
              />
              <Area
                name="Posts"
                dataKey="posts"
                type="natural"
                fill="url(#fillPost)"
                stroke="var(--color-posts)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Growth Rates (%)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartGrowthConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
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
                tickFormatter={(value) => format(new Date(value), "MMMM yy")}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) =>
                      format(new Date(value), "MMMM yy")
                    }
                    indicator="dot"
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                dataKey="userGrowthRate"
                type="monotone"
                stroke="var(--color-userGrowthRate)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="postGrowthRate"
                type="monotone"
                stroke="var(--color-postGrowthRate)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrowthChart;
