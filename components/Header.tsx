"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Menu } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type Props = {
  active: number;
};

const Header = ({ active }: Props) => {
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
              className="text-gray-600 dark:text-gray-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-500   "
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
          <form className={"flex md:hidden w-full"}>
            <Input
              type="search"
              placeholder="Search..."
              className="outline-0"
            />
          </form>
          <div className="flex items-center space-x-2">
            <form className={"hidden md:flex"}>
              <Input
                type="search"
                placeholder="Search..."
                className="w-full md:w-64"
              />
            </form>

            <ThemeSwitcher />
            <Link className="md:flex hidden" href={""}>
              <Avatar>
                <AvatarImage
                  src="/male.png"
                  className="hue-rotate-60"
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
                        className="hue-rotate-60"
                        src="/male.png"
                        alt="user"
                      />
                      <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                    Relix
                  </span>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-500   "
                  >
                    Profile
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-500   "
                  >
                    Home
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-500   "
                  >
                    Categories
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-500   "
                  >
                    Contact
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-500   "
                  >
                    Sign out
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
