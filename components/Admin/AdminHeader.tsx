"use client";
import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";
import { ThemeSwitcher } from "@/utils/ThemeSwitcher";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";

const AdminHeader = () => {
  return (
    <header className="sticky px-2 py-1 top-0 flex justify-between shrink-0 dark:border-b-2 backdrop-blur shadow-sm dark:bg-gray-900/70 bg-slate-50/60 items-center z-50">
      <SidebarTrigger className="h-10 w-10" />
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="relative" variant={"ghost"}>
              <Bell className="w-[16px]" />
              <span className="flex items-center rounded-full right-2 bottom-2 justify-center text-[12px] absolute bg-red-500 w-4 h-4 text-white">
                1
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 max-h-[300px] overflow-y-auto">
            <div>
              <div className="flex justify-center border-b-gray-400 border-b">
                Notifications
              </div>
              <div className="mt-2">
                <h5 className="text-sm">Request to become author</h5>
                <h4 className="text-sm text-slate-500 dark:text-slate-300">
                  something@gmail.com is requested for author.
                </h4>
                <div className="flex justify-end gap-2">
                  <Button className="p-0 m-0" variant={"link"}>
                    Mark as Read
                  </Button>
                  <Button className="p-0 m-0" variant={"link"}>
                    View
                  </Button>
                </div>
              </div>
              <Separator />
            </div>
          </PopoverContent>
        </Popover>
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default AdminHeader;
