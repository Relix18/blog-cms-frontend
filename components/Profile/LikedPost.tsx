import { useGetLikePostQuery } from "@/state/api/post/postApi";
import React, { use } from "react";
import { TabsContent } from "../ui/tabs";
import Link from "next/link";
import { Button } from "../ui/button";
import { IPost } from "@/types/types";
import { format } from "date-fns";

interface LikedPost {
  id: number;
  createdAt: Date;
  post: IPost;
  postId: number;
  userId: string;
}

const LikedPost = () => {
  const { data: LikedPost } = useGetLikePostQuery({});
  console.log(LikedPost);
  return (
    <TabsContent value="like">
      <div className="space-y-6">
        {LikedPost?.likedPost.map((like: LikedPost) => (
          <article
            key={like.id}
            className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0"
          >
            <h3 className="text-xl line-clamp-2 font-semibold text-gray-900 dark:text-white mb-2">
              <Link
                href="#"
                className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400"
              >
                {like.post.title}
              </Link>
            </h3>
            <p className="text-gray-600 line-clamp-5 dark:text-gray-300 mb-4">
              {like.post.description}
            </p>
            <div className="flex flex-wrap justify-between items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Liked on {format(like.createdAt, "MMMM dd, yyyy")}
              </span>
              <Link
                href={`/post/view/${like.post.slug}`}
                className="text-fuchsia-600 dark:text-fuchsia-400"
              >
                Read More
              </Link>
            </div>
          </article>
        ))}
      </div>
    </TabsContent>
  );
};

export default LikedPost;
