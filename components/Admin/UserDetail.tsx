"use client";

import React from "react";
import { format } from "date-fns";
import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  User,
  Globe,
  Linkedin,
  Github,
  Twitter,
  MessageSquare,
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

interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: "user" | "author" | "admin";
  status: "active" | "inactive" | "suspended";
  lastLogin: Date;
  createdAt: Date;
  phone: string;
  address: string;
  bio: string;
  socialLinks: {
    twitter: string;
    linkedin: string;
    github: string;
  };
  postsCount: number;
  commentsCount: number;
}

const user: UserProfile = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  role: "author",
  status: "active",
  lastLogin: new Date("2023-06-15T10:00:00"),
  createdAt: new Date("2023-01-01"),
  phone: "+1 (555) 123-4567",
  address: "123 Main St, Anytown, USA 12345",
  bio: "Passionate writer and tech enthusiast. Always learning and sharing knowledge through my articles.",
  socialLinks: {
    twitter: "https://twitter.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
  },
  postsCount: 15,
  commentsCount: 45,
};

export default function UserDetail() {
  const handleDeleteUser = () => {
    console.log("Deleting user:", user.id);
    // Here you would typically send an API request to delete the user
  };

  return (
    <div className="container px-2 mx-auto py-10">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center space-x-4 pb-2">
          <Avatar className="h-20 w-20 ">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
              alt={user.name}
            />
            <AvatarFallback>
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge
              variant={user.status === "active" ? "default" : "destructive"}
            >
              {user.status}
            </Badge>
            <Badge variant="secondary">{user.role}</Badge>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label className="text-muted-foreground">Full Name</Label>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{user.name}</span>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Email</Label>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Phone</Label>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{user.phone}</span>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Address</Label>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{user.address}</span>
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-1">
            <Label className="text-muted-foreground">Bio</Label>
            <p>{user.bio}</p>
          </div>
          <Separator />
          <div className="space-y-1">
            <Label className="text-muted-foreground">Social Links</Label>
            <div className="flex space-x-4">
              <a
                href={user.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={user.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={user.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:underline"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label className="text-muted-foreground">Last Login</Label>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{format(user.lastLogin, "PPpp")}</span>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Account Created</Label>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{format(user.createdAt, "PPpp")}</span>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Posts Count</Label>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span>{user.postsCount}</span>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Comments Count</Label>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span>{user.commentsCount}</span>
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
