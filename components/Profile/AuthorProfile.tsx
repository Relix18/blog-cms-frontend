"use client";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatLikes } from "@/utils/NumberFormat";
import PublishedPost from "./PublishedPost";
import { Tabs } from "../ui/tabs";
import { Button } from "../ui/button";
import { IPost, IUser } from "@/types/types";
import { useRouter } from "next/navigation";

interface Author extends IUser {
  posts: IPost[];
  postLike: [];
}

type Props = {
  user: Author;
};

const AuthorProfile = ({ user }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (user?.role === "USER") return router.back();
  }, [user, router]);

  const getTotalLikes = (post: IPost[]) => {
    return post
      ?.map((post) => post.likes?.length || 0) // Get the count of likes for each post
      .reduce((sum, likeCount) => sum + likeCount, 0); // Sum up all like counts
  };

  const getTotalComment = (post: IPost[]) => {
    return post
      ?.map((post) => post.comments?.length || 0) // Get the count of likes for each post
      .reduce((sum, commentCount) => sum + commentCount, 0); // Sum up all like counts
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-10 dark:bg-background">
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-muted/50 shadow rounded-lg overflow-hidden">
              <div className="p-6 sm:p-8 md:p-10">
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                  <Avatar className="w-24 h-24 border-4  border-fuchsia-600 ">
                    <AvatarImage
                      src={
                        user?.profile?.avatar
                          ? user?.profile.avatar
                          : "/male.png"
                      }
                      alt="Author Avatar"
                    />
                    <AvatarFallback>{user?.name.slice(1)}</AvatarFallback>
                  </Avatar>

                  <div className="text-center sm:text-left">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {user?.name}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {user?.profile?.bio}
                    </p>

                    <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                      <span className="text-gray-500 dark:text-gray-400 flex items-center">
                        <ThumbsUp className="h-5 w-5 mr-1" />
                        {formatLikes(getTotalLikes(user?.posts))} Likes
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 flex items-center">
                        <MessageSquare className="h-5 w-5 mr-1" />
                        {formatLikes(getTotalComment(user?.posts))} Comments
                      </span>
                    </div>

                    <div className="flex justify-center sm:justify-start space-x-4 mt-4">
                      {user?.profile?.social?.mailLink && (
                        <Link
                          href={`mailto:${user.profile?.social.mailLink}`}
                          className="text-fuchsia-600 hover:text-fuchsia-700"
                        >
                          <Mail className="h-5 w-5" />
                        </Link>
                      )}
                      {user?.profile?.social?.instaLink && (
                        <Link
                          href={user.profile?.social.instaLink}
                          className="text-fuchsia-600 hover:text-fuchsia-700"
                        >
                          <Instagram className="h-5 w-5" />
                        </Link>
                      )}
                      {user?.profile?.social?.githubLink && (
                        <Link
                          href={user.profile?.social.githubLink}
                          className="text-fuchsia-600 hover:text-fuchsia-700"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-5 w-5" />
                        </Link>
                      )}
                      {user?.profile?.social?.facebookLink && (
                        <Link
                          href={user.profile?.social.facebookLink}
                          className="text-fuchsia-600 hover:text-fuchsia-700"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Facebook className="h-5 w-5" />
                        </Link>
                      )}
                      {user?.profile?.social?.linkedinLink && (
                        <Link
                          href={user.profile?.social.linkedinLink}
                          className="text-fuchsia-600 hover:text-fuchsia-700"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="h-5 w-5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                <Tabs value={"posts"} className="w-full">
                  <Button
                    variant={"secondary"}
                    className="w-full cursor-default"
                  >
                    <h1 className="text-2xl font-bold text-center ">
                      Author Posts
                    </h1>
                  </Button>
                  <PublishedPost posts={user?.posts} />
                </Tabs>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AuthorProfile;
