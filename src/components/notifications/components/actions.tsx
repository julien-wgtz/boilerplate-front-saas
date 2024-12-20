import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { NotificationType } from "../../../../types/notificationsType";
import { useTranslations } from "use-intl";
import NotificationsService from "@/services/notifications";
import AccountServices from "@/services/account";
import { set } from "react-hook-form";
import UserService from "@/services/users";
import useUserStore from "@/stores/userStore";
import { toast } from "@/hooks/use-toast";

type ActionsProps = {
  notification: any;
  removeNotif: () => void;
};

const Actions = ({
  notification,
  removeNotif,
}: ActionsProps) => {
  const [isLoading, setIsLoading] =
    useState(false);
  const { setUser } = useUserStore();

  const setReadNotification = async () => {
    setIsLoading(true);
    NotificationsService.markAsRead(
      notification.id
    );
    removeNotif();
    setIsLoading(false);
  };

  const declineInvite = async () => {
    setReadNotification();
    await AccountServices.declineInvite(
      notification.accountId
    ).then((res) => {
      if (res.status === 401) {
        toast({
          variant: "destructive",
          description: t(
            "invitation_already_deleted"
          ),
        });
      }
    });
  };

  const acceptInvit = async () => {
    setIsLoading(true);
    await AccountServices.acceptInvite(
      notification.accountId
    ).then((res) => {
      if (res.status === 401) {
        toast({
          variant: "destructive",
          description: t(
            "invitation_already_deleted"
          ),
        });
      }
    });
    await UserService.me().then((data) => {
      setUser(data);
    });
    await setReadNotification();
    setIsLoading(false);
  };

  const t = useTranslations();
  return (
    <div className="flex justify-end gap-2 pt-2">
      {notification.type ===
        NotificationType.INVITE && (
        <>
          <Button
            className="bg-transparent"
            variant={"outline"}
            size={"sm"}
            onClick={declineInvite}
            disabled={isLoading}
          >
            {t("decline")}
          </Button>
          <Button
            variant={"default"}
            size={"sm"}
            onClick={acceptInvit}
            disabled={isLoading}
          >
            {t("accept")}
          </Button>
        </>
      )}
      {notification.type ===
        NotificationType.MESSAGE && (
        <>
          <Button
            variant={"default"}
            size={"sm"}
            onClick={setReadNotification}
            disabled={isLoading}
          >
            {t("mark_as_read")}
          </Button>
        </>
      )}
    </div>
  );
};

export default Actions;
