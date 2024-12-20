"use client";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useUserStore from "@/stores/userStore";
import { hasRole } from "@/utils/roleChecker";
import { useTranslations } from "next-intl";
import React from "react";
import Delete from "./components/delete";
import Leave from "./components/leave";
import ChangeName from "./components/changeName";
import { Skeleton } from "@/components/ui/skeleton";

const Page: React.FC = () => {
  const t = useTranslations();
  const {
    currentAccount,
    roleCurrentAccount,
    user,
  } = useUserStore();
  return (
    <Card className="p-4 ">
      <h3 className="text-lg font-medium">
        {t("profile")}
      </h3>
      <p className="text-sm text-muted-foreground">
        {t("description_profil")}
      </p>
      <Separator className="my-4" />
      <div className="">
        {currentAccount ? (
          <ChangeName
            workspace={currentAccount}
          />
        ) : (
          <div className="p-2 pl-3">
            <Skeleton className="h-24 w-24 rounded-lg" />
          </div>
        )}
        {currentAccount?.users?.length > 1 && (
          <>
            <Separator className="my-4" />
            <Leave workspace={currentAccount} />
          </>
        )}
        {hasRole(
          [roleCurrentAccount],
          ["OWNER"]
        ) && (
          <>
            {user.accounts[0].id !==
              currentAccount.id && (
              <>
                <Separator className="my-4" />
                <Delete
                  workspace={currentAccount}
                />
              </>
            )}
          </>
        )}
      </div>
    </Card>
  );
};

export default Page;
