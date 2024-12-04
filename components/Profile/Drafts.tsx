import React, { useEffect } from "react";
import { TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import { IPost } from "@/types/types";
import { format } from "date-fns";
import { usePublishPostMutation } from "@/state/api/post/postApi";
import { ProfilePostLoader } from "../Loader/SkeletonLoader";
import { useToast } from "@/hooks/use-toast";
import Loader from "../Loader/Loader";
import Link from "next/link";

type Props = {
  posts: IPost[];
  isLoading: boolean;
};

const Drafts = ({ posts, isLoading }: Props) => {
  const [publishPost, { isLoading: publishLoading, isSuccess, error }] =
    usePublishPostMutation();
  const drafts = posts?.filter((post) => post.published === false);
  const { toast } = useToast();

  const publishHanlder = async (id: number) => {
    await publishPost(id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast({ title: "Post Published Successfully" });
    }
    if (error) {
      toast({ title: error?.data.message });
    }
  }, [isSuccess, error, toast]);

  return (
    <TabsContent value="drafts">
      {isLoading && <ProfilePostLoader />}
      {drafts?.length === 0 ? (
        <div className="flex justify-center items-center h-[200px] text-lg text-gray-400">
          No draft post available
        </div>
      ) : (
        <div className="space-y-6">
          {drafts?.map((post) => (
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
                  Last edited on June {format(post.updatedAt, "dd MMMM, yyyy")}
                </span>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-fuchsia-600 border-fuchsia-600"
                  >
                    <Link href={`post/edit-post/${post.slug}`}>Edit</Link>
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => publishHanlder(post.id)}
                    className="bg-fuchsia-600 text-white hover:bg-fuchsia-700"
                  >
                    Publish {publishLoading && <Loader isButton={true} />}
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

export default Drafts;
