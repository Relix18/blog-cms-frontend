"use client";

import React, { useEffect } from "react";
import { format } from "date-fns";
import {
  Calendar,
  Mail,
  User,
  Globe,
  Linkedin,
  Github,
  MessageSquare,
  Instagram,
  ThumbsUp,
  MessageSquareDot,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
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
} from "@/components/ui/alert-dialog";
import {
  useDeleteUserMutation,
  useGetUserDetailsQuery,
} from "@/state/api/user/userApi";
import { useParams } from "next/navigation";
import { IPost, isApiResponse, IUser } from "@/types/types";
import Loader from "../Loader/Loader";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface User extends IUser {
  post: IPost;
  _count: {
    comments: number;
    postLike: number;
    posts: number;
    reply: number;
  };
}

export default function UserDetail() {
  const params = useParams();
  const router = useRouter();
  const { data, isLoading } = useGetUserDetailsQuery(params && params.id);
  const [deleteUser, { isSuccess, error }] = useDeleteUserMutation({});
  const { toast } = useToast();

  useEffect(() => {
    if (isSuccess) {
      toast({ title: "User deleted successfully" });
      router.back();
    }
    if (isApiResponse(error)) {
      toast({ title: error?.data.message });
    }
  }, [isSuccess, toast, router, error]);

  const user: User = data?.user;

  const handleDeleteUser = async () => {
    await deleteUser(user.id);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="container px-2 mx-auto py-10 ">
      <Card className="w-full max-w-4xl mx-auto ">
        <CardHeader className="flex flex-row items-center space-x-4 pb-2">
          <Avatar className="h-20 w-20 ">
            <AvatarImage src={user?.profile.avatar} alt={user?.name} />
            <AvatarFallback>
              {user?.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-2xl">{user?.name}</CardTitle>
            <CardDescription>{user?.email}</CardDescription>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge variant="default">{user?.role}</Badge>
            <Badge variant={user.isSocial ? "outline" : "secondary"}>
              {user.isSocial ? "Social" : "Email"}
            </Badge>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label className="text-muted-foreground">Full Name</Label>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{user?.name}</span>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Email</Label>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user?.email}</span>
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-1 pt-6">
            <Label className="text-muted-foreground">Bio</Label>
            <p>{user?.profile.bio}</p>
          </div>
          <Separator />
          <div className="space-y-1 py-6">
            <Label className="text-muted-foreground">Social Links</Label>
            <div className="flex space-x-4">
              {user?.profile.social?.instaLink && (
                <a
                  href={user.profile.social.instaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {user?.profile.social?.linkedinLink && (
                <a
                  href={user.profile.social.linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {user?.profile.social?.githubLink && (
                <a
                  href={user.profile.social.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:underline"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label className="text-muted-foreground">Last Updated</Label>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{format(user?.updatedAt, "PPpp")}</span>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Account Created</Label>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{format(user?.createdAt, "PPpp")}</span>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Posts Count</Label>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span>{user?._count.posts}</span>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Post Likes</Label>
              <div className="flex items-center space-x-2">
                <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                <span>{user?._count.postLike}</span>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Comments Count</Label>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span>{user?._count.comments}</span>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Reply Count</Label>
              <div className="flex items-center space-x-2">
                <MessageSquareDot className="h-4 w-4 text-muted-foreground" />
                <span>{user?._count.reply}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="flex justify-end pt-6">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete User</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  user account and remove all associated data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteUser}
                  className="bg-red-600 focus:ring-red-600"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
}
