export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "AUTHOR" | "USER";
  isSocial: boolean;
  profile: Profile;
  createdAt: Date;
  updatedAt: Date;
}

interface Profile {
  id: number;
  avatar: string;
  bio: string | null;
  social: SOCIAL;
}

interface SOCIAL {
  id: number;
  facebookLink: string | null;
  githubLink: string | null;
  instaLink: string | null;
  linkedinLink: string | null;
  mailLink: string | null;
}

export interface IPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  tags: ITag[];
  category: Option;
  categoryId: number;
  description: string;
  featuredImage: string;
  published: boolean;
  publishedAt: Date;
  author: IUser;
  authorId: string;
  views: number;
  minRead: number;
  likes: ILike[];
  comments: IComment[];
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeyword: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITag {
  tag: Option;
}

export interface Option {
  value: string;
  label: string;
  id: number;
}

export interface IReply {
  id: number;
  content: string;
  commentId: number;
  user: IUser;
  createdAt: Date;
}

export interface IComment {
  content: string;
  createdAt: Date;
  id: number;
  user: IUser;
  replies: IReply[];
}

export interface ILike {
  id: string;
  postId: number;
  userId: string;
  createdAt: Date;
}

export interface IAuthor {
  id: string;
  name: string;
  profile: { avatar: string; bio: string };
  _count: { posts: number };
}

export interface ApiErrorResponse {
  status: number;
  data: { message: string; errors: { [k: string]: string[] } };
}

interface Growth {
  comments: { currentPeriod: number; lastPeriod: number; percentage: string };
  users: { currentPeriod: number; lastPeriod: number; percentage: string };
  likes: { currentPeriod: number; lastPeriod: number; percentage: string };
  posts: { currentPeriod: number; lastPeriod: number; percentage: string };
  views: { currentPeriod: number; lastPeriod: number; percentage: string };
}

export interface Analytics {
  customTime: number;
  growth: Growth;
  posts: IPost[];
  totalComments: number;
  totalLikes: number;
  totalPosts: number;
  totalViews: number;
  categoryMetrics: CategoryMetrics[];
  categoryPercentages: CategoryPercentages[];
}

export interface AdminAnalytics {
  customTime: number;
  growth: Growth;
  posts: IPost[];
  totalUsers: number;
  totalLikes: number;
  totalPosts: number;
  totalViews: number;
  viewsChart: { month: Date; views: number }[];
  usersChart: { month: Date; users: number }[];
  categoryMetrics: CategoryMetrics[];
  categoryPercentages: CategoryPercentages[];
}

interface CategoryMetrics {
  category: string;
  comment: number;
  views: number;
  likes: number;
}

interface CategoryPercentages {
  name: string;
  value: number;
  count: number;
}

export interface MonthlyMetrics {
  month: string;
  views: number;
  likes: number;
  comments: number;
  replies: number;
  posts: number;
  totalEngagement: number;
  viewsGrowth?: number;
  likesGrowth?: number;
  commentsGrowth?: number;
  repliesGrowth?: number;
}

export interface SinglePostAnalytics {
  postId: number;
  title: string;
  views: number;
  likes: number;
  comments: number;
  replies: number;
  totalEngagement: number;
  createdAt: Date;
}

export interface MonthlyPostAnalytics {
  monthlyAnalytics: MonthlyMetrics[];
  postAnalytics: SinglePostAnalytics[];
}

export interface MonthlyUserActivity {
  month: string;
  newUsers: number;
  activeUsers: number;
  interactions: {
    views: number;
    likes: number;
    comments: number;
    replies: number;
  };
  newAuthors: number;
}

export interface DetailedPlatformUserAnalytics {
  totalUsers: number;
  newUsers: number;
  activeUsers: number;
  authors: number;
  monthlyActivity: MonthlyUserActivity[];
  allMonthlyActivity: MonthlyUserActivity[];
}

export interface ISiteSettings {
  id: string;
  logoUrl: string;
  logoUrlId: string;
  siteName: string;
  heroTitle: string;
  heroDescription: string;
  heroImageUrl: string | null;
  heroImageUrlId: string | null;
  accentColor: string;
  gradientStart: string;
  gradientEnd: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface INotification {
  id: string;
  title: string;
  message: string;
  userId: string;
  user: IUser;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function isApiResponse(error: unknown): error is ApiErrorResponse {
  return (
    typeof error === "object" &&
    error != null &&
    "status" in error &&
    typeof error.status === "number"
  );
}
