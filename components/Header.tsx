"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Blocks,
  BookOpen,
  HomeIcon,
  LogIn,
  LogOutIcon,
  LucideContact,
  Menu,
  PenTool,
  PlusSquare,
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
} from "./ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useGetCategoryQuery } from "@/state/api/post/postApi";
import { Option, isApiResponse } from "@/types/types";
import { useSearchParams } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { useAuthorRequestMutation } from "@/state/api/user/userApi";
import { useToast } from "@/hooks/use-toast";
import { selectSettings } from "@/state/api/site/siteSlice";
import Image from "next/image";
import socketIO from "socket.io-client";
import { Separator } from "./ui/separator";
import { MdOutlineAnalytics, MdOutlineDashboard } from "react-icons/md";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  active?: number;
  isProfile?: boolean;
};

const Header = ({ active, isProfile }: Props) => {
  const { data } = useSession();
  const [logoutUser, setLogoutUser] = useState<boolean>(false);
  const [socialAuth] = useSocialAuthMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const isAuthenticated = useAuth();
  const {} = useLogoutQuery(undefined, { skip: !logoutUser ? true : false });
  const [authorRequest, { isSuccess, data: requestSuccess, error }] =
    useAuthorRequestMutation();
  const user = useSelector(getLoggedUser);
  const { data: categories } = useGetCategoryQuery({});
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const settings = useSelector(selectSettings);

  useEffect(() => {
    const existingQuery = searchParams?.get("search") || "";
    setSearchQuery(existingQuery);
  }, [searchParams]);

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
  }, [data, socialAuth, isAuthenticated, user]);

  useEffect(() => {
    if (isSuccess) {
      socketId.emit("notification", {
        title: "New Author Request",
        message: `You have a new author request by ${user?.name}`,
        userId: user?.id,
      });
      toast({ title: requestSuccess?.message });
    }
    if (isApiResponse(error)) {
      toast({ title: error.data.message });
    }
  }, [isSuccess, error, requestSuccess, toast, user]);

  const authorRequestHanlder = async () => {
    await authorRequest({});
  };

  const logoutHandler = async () => {
    setLogoutUser(true);
    await signOut();
    router.push("/");
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/filter?search=${searchQuery}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full relative ">
      <header className=" backdrop-blur w-full fixed top-0 left-0 shadow-sm dark:bg-gray-900/70 bg-slate-50/60  z-50 dark:border-b-2">
        <div className="mx-2 px-2 py-2 flex items-center justify-between">
          <Link href="/" className="flex items-center ">
            {settings?.logoUrl ? (
              <Image
                className="mr-4 h-6 w-6"
                src={settings.logoUrl}
                alt=""
                height="25"
                width="25"
              />
            ) : (
              <BookOpen className="mr-4 h-6 w-6 text-accentColor" />
            )}

            <span className="text-xl font-bold font-Poppins md:flex hidden">
              {settings?.siteName || "OrbitBlog"}
            </span>
          </Link>
          <nav className="hidden items-center md:flex space-x-4">
            <Link
              href="/"
              className={
                active === 1
                  ? "text-accentColor "
                  : "text-gray-600 dark:text-gray-300 hover:text-accentColor/80 dark:hover:text-accentColor"
              }
            >
              Home
            </Link>
            <NavigationMenu>
              <NavigationMenuList className="m-0 p-0 ">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="p-0 text-md font-normal text-gray-600 dark:text-gray-300 bg-transparent dark:bg-transparent hover:bg-transparent hover:dark:bg-transparent hover:text-accentColor/80 dark:hover:text-accentColor">
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {categories?.categories.map((category: Option) => (
                      <NavigationMenuLink asChild key={category.id}>
                        <Link
                          href={`/filter?categories=${category.label}`}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline min-w-40 outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {category.label}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Link
              href="/contact"
              className={
                active === 3
                  ? "text-accentColor "
                  : "text-gray-600 dark:text-gray-300 hover:text-accentColor/80 dark:hover:text-accentColor"
              }
            >
              Contact
            </Link>
          </nav>
          <div className="md:hidden flex w-full">
            <Input
              type="search"
              placeholder="Search by Title, Author..."
              className="outline-0 flex-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>
          <div className="flex items-center space-x-2">
            {isProfile && (
              <div className="hidden md:flex gap-4">
                <Link
                  href="/admin/dashboard"
                  className={`${
                    user?.role !== "ADMIN" && "hidden"
                  } text-gray-600 dark:text-gray-300 hover:text-accentColor dark:hover:text-accentColor/80`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/post/new-post"
                  className="text-gray-600 dark:text-gray-300 hover:text-accentColor dark:hover:text-accentColor/80   "
                >
                  New Post
                </Link>
                <Link
                  href="/author/analytics"
                  className="text-gray-600 dark:text-gray-300 hover:text-accentColor dark:hover:text-accentColor/80   "
                >
                  Analytics
                </Link>
              </div>
            )}
            {user?.role === "USER" && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="hidden md:flex items-center space-x-2  text-accentColor"
                  >
                    <PenTool className="h-4 w-4" />
                    <span className="hidden lg:flex">Become an Author</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you passionate about sharing your knowledge and
                      expertise with the Orbit Blog community? Becoming an
                      author allows you to contribute articles, inspire readers,
                      and establish yourself as a thought leader in your field.
                      By submitting this request, you’ll notify our admin team,
                      who will review your application. Once approved, you’ll
                      gain access to our author dashboard to start crafting
                      compelling content. Take the first step in making your
                      voice heard and join a thriving community of writers
                      today!
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-accentColor hover:bg-accentColor/90"
                      onClick={authorRequestHanlder}
                    >
                      Send Request
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <div
              className={` ${
                isProfile ? "md:hidden" : "md:flex"
              } hidden md:flex`}
            >
              <Input
                type="search"
                placeholder="Search by Title or Author..."
                className="w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>

            <ThemeSwitcher />
            <Link
              className="md:flex hidden"
              href={isAuthenticated ? "/profile" : "/login"}
            >
              <Avatar className={isProfile ? "hidden" : ""}>
                <AvatarImage
                  src={user?.profile?.avatar || "/male.png"}
                  alt="user"
                />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
            </Link>
            <Sheet open={isMainMenuOpen} onOpenChange={setIsMainMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-4">
                  {isAuthenticated ? (
                    <>
                      <span className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={user?.profile?.avatar || "/male.png"}
                            alt="user"
                          />
                          <AvatarFallback>User</AvatarFallback>
                        </Avatar>
                        {user?.name}
                      </span>

                      <Link
                        href="/profile"
                        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-accentColor dark:hover:text-accentColor/80   "
                      >
                        <UserCircle className="mr-2 h-5 w-5 " /> Profile
                      </Link>
                    </>
                  ) : (
                    <Link
                      href={"/login"}
                      className="flex items-center text-md text-accentColor font-bold"
                    >
                      <LogIn className="mr-2" /> Login
                    </Link>
                  )}
                  <Link
                    href="/"
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-accentColor dark:hover:text-accentColor/80   "
                  >
                    <HomeIcon className="h-5 w-5 mr-2" /> Home
                  </Link>

                  <NavigationMenu>
                    <NavigationMenuList className="m-0 p-0 ">
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="p-0 text-md text-gray-600 dark:text-gray-300 bg-transparent dark:bg-transparent hover:bg-transparent hover:dark:bg-transparent hover:text-accentColor/80 dark:hover:text-accentColor/80">
                          <Blocks className="flex mr-2 h-5 w-5" />
                          Categories
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          {categories?.categories.map((category: Option) => (
                            <NavigationMenuLink asChild key={category.id}>
                              <Link
                                href={`filter?category=${category.value}`}
                                onClick={() => setIsMainMenuOpen(false)}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline min-w-40 outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">
                                  {category.label}
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                  <Link
                    href="/contact"
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-accentColor/80 dark:hover:text-accentColor/80   "
                  >
                    <LucideContact className="mr-2 h-5 w-5" /> Contact
                  </Link>
                  <Separator />
                  {user?.role === "USER" && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="justify-start p-0 bg-transparent hover:bg-transparent text-accentColor ">
                          <PenTool /> Become an Author
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you passionate about sharing your knowledge and
                            expertise with the Orbit Blog community? Becoming an
                            author allows you to contribute articles, inspire
                            readers, and establish yourself as a thought leader
                            in your field. By submitting this request, you’ll
                            notify our admin team, who will review your
                            application. Once approved, you’ll gain access to
                            our author dashboard to start crafting compelling
                            content. Take the first step in making your voice
                            heard and join a thriving community of writers
                            today!
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-accentColor hover:bg-accentColor/90"
                            onClick={authorRequestHanlder}
                          >
                            Send Request
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                  {user?.role !== "USER" && (
                    <div className="flex flex-col gap-4">
                      <Link
                        href="/admin/dashboard"
                        className={`${
                          user?.role !== "ADMIN" && "hidden"
                        } text-gray-600 flex dark:text-gray-300 hover:text-accentColor dark:hover:text-accentColor/80`}
                      >
                        <MdOutlineDashboard className="h-5 w-5 mr-2" />{" "}
                        Dashboard
                      </Link>
                      <Link
                        href="/post/new-post"
                        className="text-gray-600 flex dark:text-gray-300 hover:text-accentColor dark:hover:text-accentColor/80   "
                      >
                        <PlusSquare className="h-5 w-5 mr-2" /> New Post
                      </Link>
                      <Link
                        href="/author/analytics"
                        className="flex text-gray-600 dark:text-gray-300 hover:text-accentColor dark:hover:text-accentColor/80   "
                      >
                        <MdOutlineAnalytics className="h-5 w-5 mr-2" />{" "}
                        Analytics
                      </Link>
                    </div>
                  )}
                </nav>

                <SheetFooter className="absolute bottom-2">
                  {isAuthenticated && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="bg-transparent hover:bg-transparent text-md px-0 text-destructive font-bold">
                          <LogOutIcon /> Sign Out
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
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
                            onClick={logoutHandler}
                          >
                            Sign Out
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
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
