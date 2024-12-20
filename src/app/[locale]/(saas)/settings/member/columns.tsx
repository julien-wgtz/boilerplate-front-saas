"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { ArrowUpDown } from "lucide-react";
import { t } from "i18next";
import AccountServices from "@/services/account";
import useUserStore from "@/stores/userStore";
import { useEffect, useState } from "react";
import { Avatar } from "@radix-ui/react-avatar";
import {
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import AvatarViewer from "@/components/avatars/avatarViewer";

export type User = {
  id: number;
  user: {
    id: number;
    email: string;
    name: string;
    avatar: string;
  };
  role: {
    role: "owner" | "admin" | "member";
    roleUserConnected:
      | "OWNER"
      | "ADMIN"
      | "MEMBER"
      | "INVITED";
  };
  date: {
    lang: string;
    date: string;
  };
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "user",
    header: ({ column }) => {
      const t = useTranslations();

      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === "asc"
            )
          }
        >
          {t("user")}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (row: any) => (
      <div className="flex items-center">
        <AvatarViewer
          imageUrl={row.getValue("user").avatar}
          name={row.getValue("user").name}
        />
        <div className="ml-2">
          <p className="font-medium">
            {row.getValue("user").name}
          </p>
          <p className="text-muted-foreground">
            {row.getValue("user").email}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      const t = useTranslations();
      return t("date");
    },
    cell: (row: any) => {
      const formatedDate = new Date(
        row.getValue("date").date
      );
      const formattedDate = new Date(
        row.getValue("date").date
      ).toLocaleDateString(
        row.getValue("date").lang,
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );
      return <p>{formattedDate}</p>;
    },
  },
  {
    accessorKey: "role",
    header: () => {
      const t = useTranslations();
      return t("role");
    },
    cell: ({ row }: any) => {
      const [role, setRole] = useState(
        row.getValue("role")
      );
      const { user } = useUserStore();

      useEffect(() => {
        setRole(row.getValue("role"));
      }, [row]);

      const handleRoleChange = (
        value: string
      ) => {
        AccountServices.updateRole(
          row.original.id,
          row.original.user.id,
          value
        ).then((res) => {
          setRole({
            ...role,
            role: value.toLowerCase(),
          });
        });
      };

      const t = useTranslations();
      if (
        role.roleUserConnected === "OWNER" ||
        role.roleUserConnected === "ADMIN"
      ) {
        return (
          <Select
            onValueChange={handleRoleChange}
            value={role.role}
            disabled={
              role.role === "owner" ||
              role.role === "invited" ||
              user.id === row.original.user.id
            }
          >
            <SelectTrigger className="">
              <SelectValue>
                {t(`role_${role.role}`)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">
                {t("role_admin")}
              </SelectItem>
              <SelectItem value="VIEWER">
                {t("role_viewer")}
              </SelectItem>
            </SelectContent>
          </Select>
        );
      } else {
        return <p>{t(`role_${role.role}`)}</p>;
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const t = useTranslations();
      const { setCurrentAccount } =
        useUserStore();
      const data = row.original;
      const handleRemoveUser = () => {
        AccountServices.leaveAccount(
          data.id,
          data.user.id
        ).then((res) => {
          AccountServices.getCurrentAccount().then(
            (act) => {
              setCurrentAccount(act.data);
            }
          );
        });
      };
      if (
        (data.role.roleUserConnected ===
          "OWNER" ||
          data.role.roleUserConnected ===
            "ADMIN") &&
        data.role.role !== "owner"
      ) {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={handleRemoveUser}
              >
                {t("remove_user_workspace")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      } else {
        return null;
      }
    },
  },
];
