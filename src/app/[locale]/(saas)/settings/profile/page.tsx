"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useUserStore from "@/stores/userStore";
import { useTranslations } from "next-intl";
import React, { use, useState } from "react";
import Appareance from "./components/appareance";
import Email from "./components/email";
import Password from "./components/password";
import Delete from "./components/delete";
import { Skeleton } from "@/components/ui/skeleton";
import ChangeName from "./components/changeName";

const Page: React.FC = () => {
  const t = useTranslations();
  const { user } = useUserStore();

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
        {user ? (
          <>
            {user ? (
              <ChangeName user={user} />
            ) : (
              <div className="p-2 pl-3">
                <Skeleton className="h-24 w-24 rounded-lg" />
              </div>
            )}
            <Email user={user} />
            <Separator className="my-4" />
            <Appareance user={user} />
            <Separator className="my-4" />
            <Password />
            <Separator className="my-4" />
            <Delete user={user} />
          </>
        ) : (
          <Skeleton className="w-full h-32" />
        )}
      </div>
    </Card>
  );
};

export default Page;
