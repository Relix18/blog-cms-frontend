"use client";
import {
  Edit3,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signOut } from "next-auth/react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useLogoutQuery } from "@/state/api/auth/authApi";
import Settings from "./Settings";
import { useSelector } from "react-redux";
import { getLoggedUser } from "@/state/api/auth/authSlice";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useUpdateAvatarMutation } from "@/state/api/user/userApi";
import { useToast } from "@/hooks/use-toast";
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
import { useRouter } from "next/navigation";
import Drafts from "./Drafts";
import { useGetAuthorPostQuery } from "@/state/api/post/postApi";
import PublishedPost from "./PublishedPost";
import useUIStore from "@/app/hooks/useUIStore";
import { formatLikes } from "@/utils/NumberFormat";
import { IPost } from "@/types/types";

const Profile = () => {
  const [logoutUser, setLogoutUser] = useState<boolean>(false);
  const user = useSelector(getLoggedUser);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const {} = useLogoutQuery(undefined, { skip: !logoutUser ? true : false });
  const { data: authorPost, isLoading } = useGetAuthorPostQuery({});
  const { toast } = useToast();
  const router = useRouter();
  const { setActiveTab, activeTab } = useUIStore();

  const signoutHandler = async () => {
    setLogoutUser(true);
    await signOut();
    router.push("/");
  };

  const imageHanlder = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();

    fileReader.onload = async () => {
      const avatar = fileReader.result;
      if (fileReader.readyState === 2) {
        updateAvatar({ avatar });
      }
    };
    if (!e.target.files) return;
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess) {
      toast({ title: "Profile picture updated successfully" });
    }
    if (error) {
      console.log(error);
    }
  }, [isSuccess, error, toast]);

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
    <div className="min-h-screen bg-gray-50 pt-10 dark:bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-muted/50 shadow rounded-lg overflow-hidden">
            <div className="p-6 sm:p-8 md:p-10">
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                <div className="relative">
                  <Avatar className="w-24 h-24 border-4  border-fuchsia-600 ">
                    <AvatarImage
                      src={
                        user?.profile?.avatar
                          ? user?.profile.avatar
                          : "/male.png"
                      }
                      alt="Author Avatar"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Input
                    type="file"
                    name=""
                    id="avatar"
                    className="hidden"
                    onChange={imageHanlder}
                    accept="image/png, image/jpg, image/jpeg, image/webp"
                  />
                  <Label htmlFor="avatar">
                    <span className="w-6 h-6 items-center cursor-pointer text-white flex justify-center rounded-full absolute bottom-2 right-2 bg-gray-500">
                      <Edit3 className="w-4 h-4    " />
                    </span>
                  </Label>
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {user?.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {user?.profile?.bio}
                  </p>
                  {user?.role !== "USER" && (
                    <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                      <span className="text-gray-500 dark:text-gray-400 flex items-center">
                        <ThumbsUp className="h-5 w-5 mr-1" />
                        {formatLikes(getTotalLikes(authorPost?.post))} Likes
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 flex items-center">
                        <MessageSquare className="h-5 w-5 mr-1" />
                        {formatLikes(getTotalComment(authorPost?.post))}{" "}
                        Comments
                      </span>
                    </div>
                  )}

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
              <Tabs
                onValueChange={setActiveTab}
                value={activeTab}
                className="w-full"
              >
                <div>
                  <TabsList className="sm:inline-flex hidden dark:bg-slate-600 bg-slate-200 dark:text-gray-300">
                    {user?.role !== "USER" && (
                      <>
                        <TabsTrigger value="posts">Published Posts</TabsTrigger>
                        <TabsTrigger value="drafts">Drafts</TabsTrigger>
                      </>
                    )}
                    <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                    <TabsTrigger value="like">Liked Posts</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="px-2 block bg-transparent hover:bg-transparent text-red-600 font-bold">
                          Sign Out
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            You will be logged out of your account and
                            redirected to the home page. This action cannot be
                            undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive hover:bg-destructive/80"
                            onClick={signoutHandler}
                          >
                            Sign Out
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TabsList>
                  <div className="sm:hidden">
                    <Select
                      onValueChange={(e) => setActiveTab(e)}
                      value={activeTab}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Published Posts" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="posts">Published Posts</SelectItem>
                        <SelectItem value="drafts">Drafts</SelectItem>
                        <SelectItem value="activity">
                          Recent Activity
                        </SelectItem>
                        <SelectItem value="like">Liked Posts</SelectItem>
                        <SelectItem value="settings">Settings</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <PublishedPost posts={authorPost?.post} isLoading={isLoading} />
                <Drafts posts={authorPost?.post} isLoading={isLoading} />
                <TabsContent value="activity">
                  <div className="space-y-6">
                    {[1, 2, 3].map((activity) => (
                      <div
                        key={activity}
                        className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {activity === 1
                            ? "Commented on"
                            : activity === 2
                            ? "Liked"
                            : "Bookmarked"}{" "}
                          <Link
                            href="#"
                            className="text-fuchsia-600 dark:text-fuchsia-400 hover:underline"
                          >
                            "The Future of AI in Everyday Life"
                          </Link>
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          {activity === 1 &&
                            "Great article! I especially enjoyed the section on AI in healthcare."}
                        </p>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {activity} day{activity !== 1 ? "s" : ""} ago
                        </span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="like">
                  <div className="space-y-6">
                    {[1, 2, 3].map((bookmark) => (
                      <article
                        key={bookmark}
                        className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0"
                      >
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          <Link
                            href="#"
                            className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400"
                          >
                            Exciting Tech Trend {bookmark}
                          </Link>
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          A brief preview of the article content. This is where
                          you'd see a summary or the first few lines of the
                          bookmarked post.
                        </p>
                        <div className="flex flex-wrap justify-between items-center gap-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Bookmarked on May {bookmark + 10}, 2023
                          </span>
                          <Button
                            variant="link"
                            className="text-fuchsia-600 dark:text-fuchsia-400"
                          >
                            Read More
                          </Button>
                        </div>
                      </article>
                    ))}
                  </div>
                </TabsContent>
                <Settings user={user} />
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
