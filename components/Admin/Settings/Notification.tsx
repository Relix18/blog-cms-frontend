"use client";
import {
  useGetNotificationsQuery,
  useReadAllNotificationMutation,
  useUpdateNotificationMutation,
} from "@/state/api/notification/notificationApi";
import { INotification } from "@/types/types";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Notification = () => {
  const { data } = useGetNotificationsQuery({});
  const [updateNotification, { data: updated, isSuccess }] =
    useUpdateNotificationMutation();
  const [markAll, { data: markedAll, isSuccess: markedAllSuccess }] =
    useReadAllNotificationMutation();
  const { toast } = useToast();

  useEffect(() => {
    if (isSuccess) {
      toast({ title: updated.message });
    }
    if (markedAllSuccess) {
      toast({ title: markedAll.message });
    }
  }, [isSuccess, updated, toast, markedAll, markedAllSuccess]);

  if (data?.notifications.length === 0) {
    return <div className="text-center">No notifications</div>;
  }

  const handleMarkAsRead = async (notificationId: string) => {
    await updateNotification(notificationId);
  };

  const handleMarkAllAsRead = async () => {
    await markAll();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <Button
          onClick={handleMarkAllAsRead}
          className="bg-accentColor hover:bg-accentColor/90"
          disabled={data?.notifications.every((n: INotification) => n.isRead)}
        >
          Mark All as Read
        </Button>
      </div>
      <div className="space-y-4">
        {data?.notifications.map((notification: INotification) => (
          <Card
            key={notification.id}
            className={
              notification.isRead
                ? "bg-gray-100 dark:bg-background"
                : "bg-white dark:bg-gray-900"
            }
          >
            <CardHeader>
              <CardTitle>{notification.title}</CardTitle>
              <CardDescription>
                From: {notification.user.name} • {notification.user.email} •{" "}
                {new Date(notification.createdAt).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{notification.message}</p>
              {!notification.isRead && (
                <Button
                  className="bg-accentColor hover:bg-accentColor/90"
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  Mark as Read
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notification;
