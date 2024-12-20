"use client";
import { Card } from "@/components/ui/card";
import useUserStore from "@/stores/userStore";
import { useTranslations } from "next-intl";
import React, {
  useEffect,
  useState,
} from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import AccountServices from "@/services/account";

const Page: React.FC = () => {
  const t = useTranslations();
  const {
    currentAccount,
    user,
    roleCurrentAccount,
  } = useUserStore();
  const [members, setMembers] = useState(
    []
  ) as any;
  useEffect(() => {
    setMembers([]);
    const arrayMembers = [] as any;
    if (currentAccount) {
      currentAccount?.users.map((member: any) => {
        const formatedUser = {} as any;
        formatedUser.user = {} as any;
        formatedUser.date = {} as any;
        formatedUser.role = {} as any;
        formatedUser.id = member.accountId;
        formatedUser.user.id = member.userId;
        formatedUser.user.email =
          member.user.email;
        formatedUser.user.name = member.user.name;
        formatedUser.date.lang = user.language;
        formatedUser.role.role =
          member.role.toLowerCase();
        formatedUser.role.roleUserConnected =
          roleCurrentAccount;
        formatedUser.date.date = member.createdAt;
        formatedUser.user.avatar =
          member.user.avatar;
        arrayMembers.push(formatedUser);
      });

      arrayMembers.sort((a: any, b: any) =>
        a.user.name.localeCompare(b.user.name)
      );
      setMembers(arrayMembers);
    }
  }, [currentAccount]);

  return (
    <Card className="p-4 ">
      <h3 className="text-lg font-medium">
        {t("member")}
      </h3>
      <p className="text-sm text-muted-foreground">
        {t("description_member")}
      </p>
      <div className="container mx-auto py-4">
        <DataTable
          columns={columns}
          data={members}
        />
      </div>
    </Card>
  );
};

export default Page;
