import useUserStore from "@/stores/userStore";
import { t } from "i18next";
import React, { use, useEffect } from "react";
import { io } from "socket.io-client";
import { useTranslations } from "use-intl";
import { X } from "lucide-react";
import NotificationsService from "@/services/notifications";
import Notification from "./notification";
import useNotificationsStore from "@/stores/notificationsStore";
import { useToast } from "@/hooks/use-toast";

type NotificationsProps = {};

const Notifications =
  ({}: NotificationsProps) => {
    const t = useTranslations();

    const { toast } = useToast();
    const { user } = useUserStore();
    const {
      notifications,
      setNotifications,
      addNotification,
    } = useNotificationsStore();

    useEffect(() => {
      if (user == null && notifications == null)
        return;
      const socket = io(
        "https://localhost:3005",
        {
          query: { userId: user?.id },
        }
      );
      socket.on(
        "newNotification",
        (notification: any) => {
          toast({
            description: t("new_notif"),
          });
          addNotification(notification);
        }
      );
      fetchNotifications();

      return () => {
        socket.disconnect();
      };
    }, [user]);

    useEffect(() => {
      if (user == null && notifications == null)
        return;

      document.addEventListener(
        "mousedown",
        handleClickOutside
      );

      return () => {
        document.removeEventListener(
          "mousedown",
          handleClickOutside
        );
      };
    }, [notifications]);
    const fetchNotifications = async () => {
      NotificationsService.getNotificationsFromUser().then(
        (data: any) => {
          const sortedData = data.sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
          );
          setNotifications(sortedData);
        }
      );
    };

    const handleClickOutside = (
      event: MouseEvent
    ) => {
      const sidebar = document.querySelector(
        "#notification-sidebar"
      );

      if (
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        sidebar.getAttribute("data-open") ===
          "true"
      ) {
        openNotificationSidebar();
      }
    };

    const openNotificationSidebar = () => {
      const sidebar = document.querySelector(
        "#notification-sidebar"
      );
      const isOpen =
        sidebar?.getAttribute("data-open");
      sidebar?.setAttribute(
        "data-open",
        isOpen == "true" ? "false" : "true"
      );
      if (isOpen == "true") {
        notifications.forEach(
          (notification: any) => {
            if (notification.seen) return;
            NotificationsService.markAsSeen(
              notification.id
            );
          }
        );
        fetchNotifications();
      }
    };
    return (
      <div
        id="notification-sidebar"
        data-open="false"
        className="fixed z-10 w-[--sidebar-width] group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] h-full top-0 left-[--sidebar-width] min-h-screen max-h-screen overflow-y-scroll data-[open=false]:left-0 bg-sidebar border-l-[1px] data-[open=true]:border-r-[1px] border-r-sidebar-border border-l-sidebar-accent transition-all ease-linear"
      >
        <div className="flex justify-between items-center p-4">
          <h3 className="text-lg font-bold">
            {t("notifications")}
          </h3>
          <div className="cursor-pointer hover:bg-primary-700/50 bg-primary-700/50:hover rounded-full items-center justify-center rounded-md p-2  hover:bg-sidebar-accent hover:text-sidebar-accent-foreground [&>svg]:size-4">
            <X
              className="cursor-pointer"
              size={16}
              onClick={openNotificationSidebar}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 p-2 pt-0">
          {notifications.length === 0 && (
            <div className="flex justify-center items-center">
              <p className="text-muted-foreground text-sm">
                {t("no_notifications")}
              </p>
            </div>
          )}
          {notifications?.map(
            (notification: any) => (
              <Notification
                key={notification.id}
                notification={notification}
                removeNotif={fetchNotifications}
              />
            )
          )}
        </div>
      </div>
    );
  };

export default Notifications;
