import React, {
  use,
  useEffect,
  useState,
} from "react";
import { NotificationType } from "../../../types/notificationsType";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import useUserStore from "@/stores/userStore";
import { useTranslations } from "next-intl";
import Actions from "./components/actions";

interface NotificationProps {
  notification: any;
  removeNotif: () => void;
}

const Notification = ({
  notification,
  removeNotif,
}: NotificationProps) => {
  const t = useTranslations();
  const { lang } = useUserStore();
  const [isVisible, setIsVisible] =
    useState(false);

  const [messageNotif, setMessageNotif] =
    useState("");

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor(
      (now.getTime() - past.getTime()) / 1000
    );

    if (diffInSeconds < 60) {
      return t("just_now", {
        seconds: diffInSeconds.toString(),
      });
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(
        diffInSeconds / 60
      ).toString();
      return t("minutes_ago", {
        minutes,
      });
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(
        diffInSeconds / 3600
      ).toString();
      return t("hours_ago", {
        hours,
      });
    } else {
      const days = Math.floor(
        diffInSeconds / 86400
      ).toString();
      return t("days_ago", {
        days,
      });
    }
  };

  const handleRemoveNotif = () => {
    setIsVisible(true);
    removeNotif();
  };

  useEffect(() => {
    if (
      notification.type ===
      NotificationType.INVITE
    ) {
      setMessageNotif(
        t.markup("invite_workspace", {
          username: notification.data.userName,
          workspace:
            notification.data.accountName,
          important: (chunks) =>
            `<strong class="font-black">${chunks}</strong>`,
        })
      );
    } else if (
      notification.type ===
      NotificationType.MESSAGE
    ) {
      const { message, ...rest } =
        notification.data;
      setMessageNotif(
        t.markup(message, {
          ...rest,
          important: (chunks) =>
            `<strong class="font-black capitalize">${chunks}</strong>`,
        })
      );
    }
  }, [notification]);

  return (
    <div
      data-seen={notification.seen}
      data-visible={isVisible}
      className="rounded-md p-2 border-[1px] border-secondary data-[seen=false]:bg-muted data-[visible=true]:hidden "
    >
      <div className="flex gap-2 items-start">
        <div className="avatar min-h-8 min-w-8">
          <img
            className="rounded-full w-8 h-8 object-cover"
            src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="avatar"
          />
        </div>
        <div className="flex flex-col w-full ">
          <p
            className="text-xs mb-1"
            dangerouslySetInnerHTML={{
              __html: messageNotif,
            }}
          ></p>
          <div className="w-full flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              {new Date(
                notification.createdAt
              ).toLocaleString(lang, {
                weekday: "long",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="text-xs text-muted-foreground">
              {getTimeAgo(notification.createdAt)}
            </p>
          </div>
        </div>
      </div>
      <Actions
        notification={notification}
        removeNotif={handleRemoveNotif}
      />
    </div>
  );
};

export default Notification;
