import Link from "next/link";
import React from "react";
import { TabsContent } from "../ui/tabs";
import { useRecentActivityQuery } from "@/state/api/post/postApi";
import { IPost } from "@/types/types";
import { format, formatDistanceStrict } from "date-fns";
import { RecentActivityLoader } from "../Loader/SkeletonLoader";

interface Activity {
  type: "LIKE" | "COMMENT" | "REPLY";
  createdAt: Date;
  post: IPost;
  content?: string;
}

const RecentActivity = () => {
  const { data, isLoading } = useRecentActivityQuery({});
  const activities = data?.activities;

  return (
    <TabsContent value="activity" className="mt-10">
      {isLoading && <RecentActivityLoader />}
      {activities?.length === 0 ? (
        <div className="flex justify-center items-center h-[200px] text-lg text-gray-400">
          No recent activities yet.
        </div>
      ) : (
        <div className="space-y-6">
          {activities?.map((activity: Activity) => (
            <div
              key={format(activity.createdAt, "MMMM dd, yyyy")}
              className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {activity.type === "COMMENT"
                  ? "Commented on"
                  : activity.type === "LIKE"
                  ? "Liked"
                  : "Replied on"}{" "}
                <Link
                  href={`/post/view/${activity.post.slug}`}
                  className="text-fuchsia-600 dark:text-fuchsia-400 hover:underline"
                >
                  {activity.post.title}
                </Link>
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {activity.type !== "LIKE" && activity.content}
              </p>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatDistanceStrict(activity.createdAt, new Date(), {
                  addSuffix: true,
                })}
              </span>
            </div>
          ))}
        </div>
      )}
    </TabsContent>
  );
};

export default RecentActivity;
