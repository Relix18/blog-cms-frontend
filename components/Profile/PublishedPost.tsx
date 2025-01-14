import React, { useEffect } from "react";
import { TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import { IPost, isApiResponse } from "@/types/types";
import { format } from "date-fns";
import { ProfilePostLoader } from "../Loader/SkeletonLoader";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useDeletePostMutation } from "@/state/api/post/postApi";
import { useToast } from "@/hooks/use-toast";

type Props = {
  posts: IPost[];
  isLoading?: boolean;
  isAuthorProfile?: boolean;
};

const PublishedPost = ({ posts, isLoading, isAuthorProfile }: Props) => {
  const published = posts?.filter((post) => post.published === true);
  const [deletePost, { isSuccess, error }] = useDeletePostMutation();
  const { toast } = useToast();

  useEffect(() => {
    if (isSuccess) {
      toast({ title: "Post Deleted Successfully" });
    }
    if (isApiResponse(error)) {
      toast({ title: error?.data.message });
    }
  }, [isSuccess, error, toast]);

  const deleteHandler = async (id: number) => {
    await deletePost(id);
  };

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
                  Published on {format(post.publishedAt, "dd MMMM, yyyy")}
                </span>
                <div className="space-x-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive border-destructive"
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this published post?
                          This action will: Permanently remove the post from
                          this site. Delete all associated views, likes, and
                          comments.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive hover:bg-destructive/80"
                          onClick={() => deleteHandler(post.id)}
                        >
                          Delete Post
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
