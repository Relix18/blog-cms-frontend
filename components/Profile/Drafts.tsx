import React, { useEffect } from "react";
import { TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import { IPost, isApiResponse } from "@/types/types";
import { format } from "date-fns";
import {
  useDeletePostMutation,
  usePublishPostMutation,
} from "@/state/api/post/postApi";
import { ProfilePostLoader } from "../Loader/SkeletonLoader";
import { useToast } from "@/hooks/use-toast";
import Loader from "../Loader/Loader";
import Link from "next/link";
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

type Props = {
  posts: IPost[];
  isLoading: boolean;
};

const Drafts = ({ posts, isLoading }: Props) => {
  const [publishPost, { isLoading: publishLoading, isSuccess, error }] =
    usePublishPostMutation();
  const drafts = posts?.filter((post) => post.published === false);
  const [deletePost, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeletePostMutation();
  const { toast } = useToast();

  useEffect(() => {
    if (isSuccess) {
      toast({ title: "Post Published Successfully" });
    }
    if (isApiResponse(error)) {
      toast({ title: error?.data.message });
    }
    if (deleteSuccess) {
      toast({ title: "Post Deleted Successfully" });
    }
    if (isApiResponse(deleteError)) {
      toast({ title: deleteError?.data.message });
    }
  }, [isSuccess, error, toast, deleteSuccess, deleteError]);

  const publishHandler = async (id: number) => {
    await publishPost(id);
  };
  const deleteHandler = async (id: number) => {
    await deletePost(id);
  };

  return (
    <TabsContent value="drafts" className="mt-10">
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
                  Last edited on {format(post.updatedAt, "dd MMMM, yyyy")}
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
                          Are you sure you want to delete this draft post? This
                          action cannot be undone.
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
                    variant="outline"
                    size="sm"
                    className="text-accentColor border-accentColor"
                  >
                    <Link href={`post/edit-post/${post.slug}`}>Edit</Link>
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => publishHandler(post.id)}
                    className="bg-accentColor text-white hover:bg-accentColor/90"
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
