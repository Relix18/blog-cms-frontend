"use client";
import {
  Edit3,
  Eye,
  EyeOff,
  Github,
  Mail,
  MessageSquare,
  ThumbsUp,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import useAuth from "@/app/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signOut } from "next-auth/react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {};

const Profile = (props: Props) => {
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("posts");
  const { user, logoutUser } = useAuth();

  const signoutHanlder = () => {
    logoutUser();
    signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10 dark:bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
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
                  <span className="w-6 h-6 items-center cursor-pointer text-white flex justify-center rounded-full absolute bottom-2 right-2 bg-gray-500">
                    <Edit3 className="w-4 h-4    " />
                  </span>
                </div>
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
                      1.2k Likes
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 flex items-center">
                      <MessageSquare className="h-5 w-5 mr-1" />
                      305 Comments
                    </span>
                  </div>

                  <div className="flex justify-center sm:justify-start space-x-4 mt-4">
                    <Link
                      href="#"
                      className="text-fuchsia-600  hover:text-fuchsia-700 "
                    >
                      <Mail className="h-5 w-5" />
                    </Link>
                    <Link
                      href="#"
                      className="text-fuchsia-600  hover:text-fuchsia-700"
                    >
                      <Github className="h-5 w-5" />
                    </Link>
                    <Link
                      href="#"
                      className="text-fuchsia-600  hover:text-fuchsia-700 "
                    >
                      <Twitter className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
              <Tabs
                onValueChange={setActiveTab}
                value={activeTab}
                defaultValue="posts"
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
                    <Button
                      onClick={signoutHanlder}
                      className="px-2 block bg-transparent hover:bg-transparent text-fuchsia-600 dark:text-red-700"
                    >
                      Sign Out
                    </Button>
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
                <TabsContent value="posts">
                  <div className="space-y-6">
                    {[1, 2, 3].map((post) => (
                      <article
                        key={post}
                        className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0"
                      >
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          Exciting Blog Post Title {post}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                        <div className="flex flex-wrap justify-between items-center gap-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Published on May {post}, 2023
                          </span>
                          <div className="space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-fuchsia-600  border-fuchsia-600 "
                            >
                              Edit
                            </Button>
                            <Button
                              variant="link"
                              className="text-fuchsia-600 "
                            >
                              View
                            </Button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="drafts">
                  <div className="space-y-6">
                    {[1, 2].map((draft) => (
                      <article
                        key={draft}
                        className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0"
                      >
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          Draft Post Title {draft}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          This is a draft post. It's not visible to the public
                          yet. You can continue editing or publish when ready.
                        </p>
                        <div className="flex flex-wrap justify-between items-center gap-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Last edited on June {draft}, 2023
                          </span>
                          <div className="space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-600 dark:border-fuchsia-400"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="default"
                              size="sm"
                              className="bg-fuchsia-600 text-white hover:bg-fuchsia-700"
                            >
                              Publish
                            </Button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </TabsContent>
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
                <TabsContent value="settings">
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Display Name</Label>
                      <Input id="name" defaultValue={user?.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user?.email}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        defaultValue={user?.profile?.bio || ""}
                      />
                    </div>

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
                    <TabsContent value="bookmarks">
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
                              A brief preview of the article content. This is
                              where you'd see a summary or the first few lines
                              of the bookmarked post.
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

                    <Button
                      type="submit"
                      className="w-full sm:w-auto bg-fuchsia-600 text-white hover:bg-fuchsia-700"
                    >
                      Save Changes
                    </Button>
                  </form>
                  <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Change Password
                    </h3>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">
                          Current Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="current-password"
                            type={showCurrentPassword ? "text" : "password"}
                            className="pr-10"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowCurrentPassword(!showCurrentPassword)
                            }
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="h-5 w-5" aria-hidden="true" />
                            ) : (
                              <Eye className="h-5 w-5" aria-hidden="true" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <div className="relative">
                          <Input
                            id="new-password"
                            type={showNewPassword ? "text" : "password"}
                            className="pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-5 w-5" aria-hidden="true" />
                            ) : (
                              <Eye className="h-5 w-5" aria-hidden="true" />
                            )}
                          </button>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="bg-fuchsia-600 text-white hover:bg-fuchsia-700"
                      >
                        Change Password
                      </Button>
                    </form>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
