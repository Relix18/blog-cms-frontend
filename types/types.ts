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
  viewsChart?: [{ month: string; views: number }];
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

export function isApiResponse(error: unknown): error is ApiErrorResponse {
  return (
    typeof error === "object" &&
    error != null &&
    "status" in error &&
    typeof error.status === "number"
  );
}
