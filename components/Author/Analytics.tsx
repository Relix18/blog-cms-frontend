"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, ThumbsUp, MessageSquare, BookOpen } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer,
} from "@/components/ui/chart";
import { Analytics, IUser } from "@/types/types";
import { useGetAnalyticsQuery } from "@/state/api/analytics/analyticsApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";

const topPosts = [
  {
    id: 1,
    title: "10 Tips for Better Writing",
    views: 15230,
    likes: 876,
    comments: 234,
  },
  {
    id: 2,
    title: "The Future of AI in Content Creation",
    views: 12450,
    likes: 743,
    comments: 189,
  },
  {
    id: 3,
    title: "How to Build a Successful Blog",
    views: 10890,
    likes: 652,
    comments: 201,
  },
];

const viewsData = [
  { name: "Jan", total: 12000 },
  { name: "Feb", total: 14000 },
  { name: "Mar", total: 18000 },
  { name: "Apr", total: 16000 },
  { name: "May", total: 21000 },
  { name: "Jun", total: 25000 },
];

const categoryData = [
  { name: "Technology", value: 40 },
  { name: "Writing", value: 30 },
  { name: "Marketing", value: 20 },
  { name: "Personal Development", value: 10 },
];

const contentPerformanceData = [
  { category: "Technology", avgViews: 5000, avgLikes: 300, avgComments: 50 },
  { category: "Writing", avgViews: 4200, avgLikes: 250, avgComments: 40 },
  { category: "Marketing", avgViews: 3800, avgLikes: 220, avgComments: 35 },
  {
    category: "Personal Development",
    avgViews: 3500,
    avgLikes: 200,
    avgComments: 30,
  },
];

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
};

const COLORS = ["#c026d3", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

type props = {
  user: IUser;
};

export default function AuthorAnalytics({ user }: props) {
  const [timeRange, setTimeRange] = useState("1");
  const { data } = useGetAnalyticsQuery(timeRange);

  const analytics: Analytics = data?.analytics;
  return (
    <div className="container mx-auto my-10 rounded-lg px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="flex items-center mb-4 md:mb-0">
          <Avatar className="h-16 w-16 mr-4">
            <AvatarImage src={user?.profile.avatar} alt={user?.name} />
            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{user?.name}</h1>
            <p className="text-muted-foreground">Author Analytics Dashboard</p>
          </div>
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.growth.posts.percentage}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalViews}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.growth.views.percentage}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalLikes}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.growth.likes.percentage}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Comments
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalComments}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.growth.comments.percentage}% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Detailed Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Views Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <LineChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[300px] w-full"
                >
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Content Performance by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[300px] w-full"
                >
                  <BarChart data={contentPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar
                      dataKey="avgViews"
                      fill="hsl(var(--chart-1))"
                      name="Avg. Views"
                    />
                    <Bar
                      dataKey="avgLikes"
                      fill="hsl(var(--chart-2))"
                      name="Avg. Likes"
                    />
                    <Bar
                      dataKey="avgComments"
                      fill="hsl(var(--chart-3))"
                      name="Avg. Comments"
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {topPosts.map((post) => (
                  <div key={post.id} className="flex items-center">
                    <Avatar className="h-9 w-9 mr-4">
                      <AvatarImage
                        src={`/placeholder.svg?height=36&width=36`}
                        alt={post.title}
                      />
                      <AvatarFallback>{post.title.charAt(0)}</AvatarFallback>
                    </Avatar>
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
                          {post.likes}
                        </span>
                        <MessageSquare className="mr-1 h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {post.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Engagement Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <BarChart
                  data={[
                    { name: "Post 1", views: 15230, likes: 876, comments: 234 },
                    { name: "Post 2", views: 12450, likes: 743, comments: 189 },
                    { name: "Post 3", views: 10890, likes: 652, comments: 201 },
                    { name: "Post 4", views: 9870, likes: 587, comments: 176 },
                    { name: "Post 5", views: 8760, likes: 521, comments: 158 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="views" fill="hsl(var(--chart-1))" />
                  <Bar dataKey="likes" fill="hsl(var(--chart-2))" />
                  <Bar dataKey="comments" fill="hsl(var(--chart-3))" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
