"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Blocks,
  BookOpen,
  HomeIcon,
  LogOutIcon,
  LucideContact,
  Menu,
  PenTool,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { signOut, useSession } from "next-auth/react";
import {
  useLogoutQuery,
  useSocialAuthMutation,
} from "@/state/api/auth/authApi";
import useAuth from "@/app/hooks/useAuth";
import { useSelector } from "react-redux";
import { getLoggedUser } from "@/state/api/auth/authSlice";

type Props = {
  active?: number;
  isProfile?: boolean;
};

const Header = ({ active, isProfile }: Props) => {
  const { data } = useSession();
  const [logoutUser, setLogoutUser] = useState<boolean>(false);
  const [socialAuth] = useSocialAuthMutation();
  const isAuthenticated = useAuth();
  const {} = useLogoutQuery(undefined, { skip: !logoutUser ? true : false });
  const user = useSelector(getLoggedUser);

  useEffect(() => {
    if (!user && !isAuthenticated) {
      if (data) {
        socialAuth({
          name: data.user?.name as string,
          email: data.user?.email as string,
          avatar: data.user?.image as string,
        });
      }
    }
  }, [data, socialAuth]);

  const logoutHandler = async () => {
    setLogoutUser(true);
    await signOut();
  };

  return (
    <div className="w-full relative ">
      <header className=" backdrop-blur w-full fixed top-0 left-0 shadow-sm dark:bg-gray-900/70 bg-slate-50/60  z-50 dark:border-b-2">
        <div className="mx-2 px-2 py-2 flex items-center justify-between">
          <Link href="/" className="flex items-center ">
            <BookOpen className="mr-4 h-6 w-6 text-fuchsia-600 dark:text-fuchsia-500" />
            <span className="text-xl font-bold font-Poppins md:flex hidden">
              OrbitBlog
            </span>
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link
              href="#"
              className={
                active === 1
                  ? "text-fuchsia-600 dark:text-fuchsia-500"
                  : "text-gray-600 dark:text-gray-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-500"
              }
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-500"
            >
              Categories
            </Link>
            <Link
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-500   "
            >
              Contact
            </Link>
          </nav>
          <form className={`md:hidden flex  w-full`}>
            <Input
              type="search"
              placeholder="Search..."
              className="outline-0"
            />
          </form>
          <div className="flex items-center space-x-2">
            {isProfile && (
              <div className="hidden md:flex gap-4">
                <Link
                  href="#"
                  className={`${
                    user?.role !== "ADMIN" && "hidden"
                  } text-gray-600 dark:text-gray-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-500`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/post/new-post"
                  className="text-gray-600 dark:text-gray-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-500   "
                >
                  New Post
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-500   "
                >
                  Analytics
                </Link>
              </div>
            )}
            {user?.role === "USER" && (
              <Button
                variant="outline"
                className="hidden md:flex items-center space-x-2 mr-4 text-fuchsia-600"
              >
                <PenTool className="h-4 w-4" />
                <span>Become an Author</span>
              </Button>
            )}
            <form
              className={` ${
                isProfile ? "md:hidden" : "md:flex"
              } hidden md:flex`}
            >
              <Input
                type="search"
                placeholder="Search..."
                className="w-full md:w-64"
              />
            </form>

            <ThemeSwitcher />
            <Link
              className="md:flex hidden"
              href={isAuthenticated ? "/profile" : "/login"}
            >
              <Avatar className={isProfile ? "hidden" : ""}>
                <AvatarImage
                  src={
                    user?.profile?.avatar ? user?.profile.avatar : "/male.png"
                  }
                  alt="user"
                />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-4">
                  <span className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={
                          user?.profile?.avatar
                            ? user?.profile.avatar
                            : "/male.png"
                        }
                        alt="user"
                      />
                      <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                    Relix
                  </span>

                  <Link
                    href="/profile"
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-500   "
                  >
                    <UserCircle className="mr-2 h-5 w-5 " /> Profile
                  </Link>
                  <Link
                    href="/"
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-500   "
                  >
                    <HomeIcon className="h-5 w-5 mr-2" /> Home
                  </Link>
                  <Link
                    href="/categories"
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-500   "
                  >
                    <Blocks className="h-5 w-5 mr-2" /> Categories
                  </Link>
                  <Link
                    href="/contact-us"
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-500   "
                  >
                    <LucideContact className="mr-2 h-5 w-5" /> Contact
                  </Link>
                  {user?.role === "USER" && (
                    <Button className="justify-start p-0 bg-transparent hover:bg-transparent text-fuchsia-600 ">
                      <PenTool /> Become an Author
                    </Button>
                  )}
                </nav>
                <SheetFooter className="absolute bottom-2">
                  <Button
                    onClick={logoutHandler}
                    className="bg-transparent hover:bg-transparent text-md px-0 text-destructive font-bold"
                  >
                    <LogOutIcon /> Sign Out
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
