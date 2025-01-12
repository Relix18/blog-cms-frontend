import React from "react";
import { TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import { IPost } from "@/types/types";
import { format } from "date-fns";
import { ProfilePostLoader } from "../Loader/SkeletonLoader";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  posts: IPost[];
  isLoading?: boolean;
  isAuthorProfile?: boolean;
};

const PublishedPost = ({ posts, isLoading, isAuthorProfile }: Props) => {
  const published = posts?.filter((post) => post.published === true);

  return (
    <TabsContent value="posts" className="mt-10">
      {isLoading && (
        <>
          <ProfilePostLoader />
          <ProfilePostLoader />
        </>
      )}
      {published?.length === 0 ? (
        <div className="flex justify-center items-center h-[200px] text-lg text-gray-400">
          Not published any post yet.
        </div>
      ) : (
        <div className="space-y-6">
          {published?.map((post) => (
            <article
              key={post.id}
              className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {post.description}
              </p>
              <div className="flex flex-wrap justify-between items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Published on May {format(post.updatedAt, "dd MMMM, yyyy")}
                </span>
                <div className="space-x-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className={cn(
                      isAuthorProfile ? "hidden" : "inline-flex",
                      "text-accentColor  border-accentColor"
                    )}
                  >
                    <Link href={`post/edit-post/${post.slug}`}>Edit</Link>
                  </Button>
                  <Button
                    asChild
                    variant={"default"}
                    size={"sm"}
                    className="bg-accentColor text-white hover:bg-accentColor/90 "
                  >
                    <Link href={`post/view/${post.slug}`}>View</Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </TabsContent>
  );
};

export default PublishedPost;
