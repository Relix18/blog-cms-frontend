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
  categories: string[];
  description: string;
  featuredImage: string;
  published: boolean;
  publishedAt: Date;
  author: IUser;
  authorId: string;
  views: number;
  likes: number;
  comments: IComment;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeyword: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReply {
  reply: string;
  commentId: number;
}

export interface IComment {
  comment: string;
}

export interface ApiErrorResponse {
  status: number;
  data: { message: string; errors: { [k: string]: string[] } };
}

export function isApiResponse(error: unknown): error is ApiErrorResponse {
  return (
    typeof error === "object" &&
    error != null &&
    "status" in error &&
    typeof error.status === "number"
  );
}
