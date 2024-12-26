"use client";
import React, { useState } from "react";
import {
  BookOpen,
  Eye,
  MessageSquare,
  ThumbsUp,
  TrendingUp,
} from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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
import { AdminAnalytics } from "@/types/types";
import { format } from "date-fns";
import Loader from "../Loader/Loader";

const chartConfig: ChartConfig = {
  views: {
    label: "Views",
    color: "hsl(var(--chart-1))",
  },
};

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("1");
  const [chartRange, setChartRange] = useState("90");
  const { data, isLoading } = useGetOverviewQuery(timeRange);

  const overview: AdminAnalytics = data?.overview;

  console.log(overview);

  const filteredData = overview?.viewsChart.filter((item) => {
    const date = new Date(item.month);
    const startDate = new Date();
    let daysToSubtract = 90;
    if (chartRange === "30") {
      daysToSubtract = 30;
    } else if (chartRange === "180") {
      daysToSubtract = 180;
    }
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  const filteredDataUsers = overview?.usersChart.filter((item) => {
    const date = new Date(item.month);
    const startDate = new Date();
    let daysToSubtract = 90;
    if (chartRange === "30") {
      daysToSubtract = 30;
    } else if (chartRange === "180") {
      daysToSubtract = 180;
    }
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  if (isLoading) return <Loader />;

  return (
    <div className="container m-auto rounded-lg px-4 py-8 min-h-screen">
      <div className="flex flex-col gap-4 md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, Relix</h1>
          <p className="text-muted-foreground">Dashboard</p>
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
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview?.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {overview?.growth.users.percentage}% from last month
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
          <Select value={chartRange} onValueChange={setChartRange}>
            <SelectTrigger
              className="w-[180px] rounded-lg sm:ml-auto"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="30" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="90" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="180" className="rounded-lg">
                Last 6 months
              </SelectItem>
            </SelectContent>
          </Select>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="dark:bg-gray-900">
              <CardHeader>
                <CardTitle>Total Views</CardTitle>
                <CardDescription>
                  Showing total views for the last {chartRange} days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <AreaChart accessibilityLayer data={filteredData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      minTickGap={32}
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                      }}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="line" />}
                      labelFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                      }}
                    />
                    <Area
                      dataKey="views"
                      type="natural"
                      fill="var(--color-views)"
                      fillOpacity={0.4}
                      stroke="var(--color-views)"
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
                      {`${format(filteredData[0].month, "MMMM")} - ${format(
                        filteredData[filteredData.length - 1].month,
                        "MMMM yy"
                      )}`}
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
            <Card className="dark:bg-gray-900">
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
                <CardDescription>
                  Showing total users for the last {chartRange} days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <BarChart accessibilityLayer data={filteredDataUsers}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                      }}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent
                          indicator="line"
                          labelFormatter={(value) => {
                            const date = new Date(value);
                            return date.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            });
                          }}
                        />
                      }
                    />
                    <Bar
                      dataKey="users"
                      type="natural"
                      fill="var(--color-views)"
                      fillOpacity={0.4}
                      stroke="var(--color-views)"
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2 font-medium leading-none">
                      Trending up by {overview?.growth.users.percentage}% this
                      month <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="flex items-center gap-2 leading-none text-muted-foreground">
                      {`${format(
                        filteredDataUsers[0].month,
                        "MMMM"
                      )} - ${format(
                        filteredDataUsers[filteredDataUsers.length - 1].month,
                        "MMMM yy"
                      )}`}
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

export default Dashboard;
