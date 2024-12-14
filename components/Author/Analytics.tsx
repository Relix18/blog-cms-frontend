"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, ThumbsUp, MessageSquare, BookOpen } from "lucide-react";
import {
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
import { Analytics, IPost, IUser } from "@/types/types";
import { useGetAnalyticsQuery } from "@/state/api/analytics/analyticsApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import Loader from "../Loader/Loader";

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
  const { data, isLoading } = useGetAnalyticsQuery(timeRange);

  const analytics: Analytics = data?.analytics;

  const postData = analytics?.posts.slice(0, 5);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto mb-10 mt-20 rounded-lg px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <Avatar className="h-16 w-16 mr-4">
                <AvatarImage src={user?.profile?.avatar} alt={user?.name} />
                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">{user?.name}</h1>
                <p className="text-muted-foreground">
                  Author Analytics Dashboard
                </p>
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
                <CardTitle className="text-sm font-medium">
                  Total Posts
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analytics?.totalPosts}
                </div>
                <p className="text-xs text-muted-foreground">
                  {analytics?.growth.posts.percentage}% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Views
                </CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analytics?.totalViews}
                </div>
                <p className="text-xs text-muted-foreground">
                  {analytics?.growth.views.percentage}% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Likes
                </CardTitle>
                <ThumbsUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analytics?.totalLikes}
                </div>
                <p className="text-xs text-muted-foreground">
                  {analytics?.growth.likes.percentage}% from last month
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
                <div className="text-2xl font-bold">
                  {analytics?.totalComments}
                </div>
                <p className="text-xs text-muted-foreground">
                  {analytics?.growth.comments.percentage}% from last month
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
                          data={analytics?.categoryPercentages}
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
                          {analytics?.categoryPercentages.map(
                            (entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            )
                          )}
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
                      <BarChart data={analytics?.categoryMetrics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar
                          dataKey="views"
                          fill="hsl(var(--chart-1))"
                          name="Views"
                        />
                        <Bar
                          dataKey="likes"
                          fill="hsl(var(--chart-2))"
                          name="Likes"
                        />
                        <Bar
                          dataKey="comments"
                          fill="hsl(var(--chart-3))"
                          name="Comments"
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
                    {postData?.map((post: IPost) => (
                      <div key={post.id} className="flex items-center">
                        <Avatar className="h-9 w-9 mr-4">
                          <AvatarImage
                            src={post.featuredImage}
                            alt={post.title}
                          />
                          <AvatarFallback>
                            {post.title.charAt(0)}
                          </AvatarFallback>
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
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={chartConfig}
                    className="h-[300px] w-full"
                  >
                    <BarChart data={postData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="title" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="views" fill="hsl(var(--chart-1))" />
                      <Bar
                        name={"likes"}
                        dataKey="likes.length"
                        fill="hsl(var(--chart-2))"
                      />
                      <Bar
                        name={"comment"}
                        dataKey="comments.length"
                        fill="hsl(var(--chart-3))"
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
}
