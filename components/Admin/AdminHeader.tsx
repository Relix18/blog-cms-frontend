"use client";
import React, { useEffect, useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";
import { ThemeSwitcher } from "@/utils/ThemeSwitcher";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import socketIO from "socket.io-client";
import {
  useGetNotificationsQuery,
  useUpdateNotificationMutation,
} from "@/state/api/notification/notificationApi";
import { INotification } from "@/types/types";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const AdminHeader = () => {
  const { data, refetch } = useGetNotificationsQuery({});
  const [updateNotification, { data: updated, isSuccess }] =
    useUpdateNotificationMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState([]);
  const { toast } = useToast();
  const [audio] = useState(
    new Audio(
      "https://res.cloudinary.com/dkjnrcbib/video/upload/v1736697738/blog/myfylsrsk0muxbkvpcxm.wav"
    )
  );

  useEffect(() => {
    if (data) {
      setNotification(
        data.notifications.filter((item: INotification) => !item.isRead)
      );
    }
    if (isSuccess) {
      toast({ title: updated.message });
      refetch();
    }
    audio.load();
  }, [data, isSuccess, audio, refetch, toast, updated]);

  useEffect(() => {
    const playAudio = () => {
      audio.play();
    };

    socketId.on("newNotification", (data) => {
      refetch();
      playAudio();
    });
  }, []);

  const updateNotificationHandler = async (id: string) => {
    await updateNotification(id);
  };

  return (
    <header className="sticky px-2 py-1 top-0 flex justify-between shrink-0 dark:border-b-2 backdrop-blur shadow-sm dark:bg-gray-900/70 bg-slate-50/60 items-center z-50">
      <SidebarTrigger className="h-10 w-10" />
      <div className="flex gap-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button className="relative" variant={"ghost"}>
              <Bell className="w-[16px]" />
              {notification.length > 0 && (
                <span className="absolute top-1 right-2 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accentColor opacity-80"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accentColor"></span>
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="relative w-80 max-h-[500px] overflow-y-auto">
            <div>
              <div className="flex justify-center border-b-gray-400 border-b">
                Notifications
              </div>
              <Link
                onClick={() => setIsOpen(false)}
                href={"/admin/settings/notification"}
              >
                <Button
                  className="sticky -top-3 w-full p-0 mt-2 "
                  variant={"outline"}
                >
                  View All
                </Button>
              </Link>
              {notification.length === 0 && (
                <div className="flex items-center justify-center my-10">
                  No notification yet.
                </div>
              )}
              {notification.map((item: INotification) => (
                <div key={item.id} className="mt-2">
                  <h5 className="text-sm font-medium">{item.title}</h5>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.message}
                  </p>
                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={() => updateNotificationHandler(item.id)}
                      className="p-0 m-0 text-accentColor"
                      variant={"link"}
                    >
                      Mark as Read
                    </Button>
                  </div>
                </div>
              ))}
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
