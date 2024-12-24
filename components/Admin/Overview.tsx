"use client";
import React, { useState } from "react";
import {
  BookOpen,
  Eye,
  MessageSquare,
  ThumbsUp,
  TrendingUp,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useGetOverviewQuery } from "@/state/api/analytics/analyticsApi";
import { Analytics } from "@/types/types";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
};

const Overview = () => {
  const [timeRange, setTimeRange] = useState("1");
  const { data } = useGetOverviewQuery(timeRange);

  const overview: Analytics = data?.overview;

  console.log(overview);

  return (
    <div className="container m-auto rounded-lg px-4 py-8 min-h-screen">
      <div className="flex flex-col gap-4 md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, Relix</h1>
          <p className="text-muted-foreground">Overview</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Last 30 days</SelectItem>
              <SelectItem value="3">Last 3 Months</SelectItem>
              <SelectItem value="6">Last 6 Months</SelectItem>
              <SelectItem value="12">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className=" dark:bg-gray-900 ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview?.totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              {overview?.growth.posts.percentage}% from last month
            </p>
          </CardContent>
        </Card>
        <Card className=" dark:bg-gray-900 ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview?.totalViews}</div>
            <p className="text-xs text-muted-foreground">
              {overview?.growth.views.percentage}% from last month
            </p>
          </CardContent>
        </Card>
        <Card className=" dark:bg-gray-900 ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview?.totalLikes}</div>
            <p className="text-xs text-muted-foreground">
              {overview?.growth.views.percentage}% from last month
            </p>
          </CardContent>
        </Card>
        <Card className=" dark:bg-gray-900 ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Comments
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview?.totalComments}</div>
            <p className="text-xs text-muted-foreground">
              {overview?.growth.comments.percentage}% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="views" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="views">Views</TabsTrigger>
          <TabsTrigger value="posts">Top Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="views" className="space-y-4">
          <div>
            <Card className="dark:bg-gray-900">
              <CardHeader>
                <CardTitle>Total Views</CardTitle>
                <CardDescription>
                  Showing total views for the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  className="max-h-[300px] w-full"
                  config={chartConfig}
                >
                  <AreaChart
                    accessibilityLayer
                    data={overview?.viewsChart}
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
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="line" />}
                    />
                    <Area
                      dataKey="views"
                      type="natural"
                      fill="var(--color-desktop)"
                      fillOpacity={0.4}
                      stroke="var(--color-desktop)"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
              <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2 font-medium leading-none">
                      Trending up by {overview?.growth.views.percentage}% this
                      month <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="flex items-center gap-2 leading-none text-muted-foreground">
                      {`${overview?.viewsChart[0].month} - ${
                        overview?.viewsChart[overview?.viewsChart?.length - 1]
                          .month
                      }`}
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="posts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {overview?.posts?.map((post, index) => (
                  <div key={post.id} className="flex items-center">
                    <div className="flex gap-4 items-center">
                      <div className="mx-auto w-4 text-lg">{index + 1}.</div>
                      <Avatar className="h-9 w-9 mr-4">
                        <AvatarImage
                          src={post?.featuredImage}
                          alt={post.title}
                        />
                        <AvatarFallback>{post.title.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="space-y-1 flex-1">
                      <p className="text-sm font-medium leading-none">
                        {post.title}
                      </p>
                      <div className="flex items-center pt-2">
                        <Eye className="mr-1 h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground mr-4">
                          {post.views}
                        </span>
                        <ThumbsUp className="mr-1 h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground mr-4">
                          {post.likes.length}
                        </span>
                        <MessageSquare className="mr-1 h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {post.comments.length}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Overview;
