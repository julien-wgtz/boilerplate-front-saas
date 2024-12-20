"use client";

import {
  Bell,
  BellRing,
  BookUser,
  Check,
  ChevronRight,
  ChevronsUpDown,
  Command,
  LogOut,
  Settings,
  Sparkles,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import UserService from "@/services/users";
import useUserStore from "@/stores/userStore";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import {
  usePathname,
  useRouter,
} from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { DashboardIcon } from "@radix-ui/react-icons";
import Notifications from "../notifications/notifications";
import useNotificationsStore from "@/stores/notificationsStore";
import AccountServices from "@/services/account";
import NewWorkspace from "./components/new-workspace";
import AvatarViewer from "../avatars/avatarViewer";

export function SidebarSaas({
  children,
  lang,
  userFetch,
  accountFetch,
}: any) {
  const t = useTranslations();
  const router = useRouter();
  const {
    user,
    currentAccount,
    setUser,
    setCurrentAccount,
    logOut,
  } = useUserStore();
  const { notificationsNotSeen } =
    useNotificationsStore();
  const pathname = usePathname();
  const [pathElement, setPathElement] = useState<
    string[]
  >([]);
  const [accountValid, setAccountValid] =
    useState([]);

  const handleLogOut = async () => {
    await UserService.logout();
    logOut();
    window.location.href = `/${lang}/signin`;
  };

  const changeCurrentAccount = async (
    index: number
  ) => {
    setCurrentAccount(
      user.accounts[index].account
    );
    await UserService.changeCurrentAccount(
      user.accounts[index].account.id
    ).then((response) => {
      setUser(response.data);
    });
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
  };

  useEffect(() => {
    setUser(userFetch);
    AccountServices.getCurrentAccount().then(
      (act) => {
        setCurrentAccount(act.data);
      }
    );
  }, [userFetch, notificationsNotSeen]);

  useEffect(() => {
    if (user) {
      if (user.theme == "light") {
        document.body.classList.remove("dark");
        document
          .querySelector("main")
          ?.classList.remove("dark");
      } else {
        document.body.classList.remove("light");
        document
          .querySelector("main")
          ?.classList.remove("light");
      }
      document.body.classList.add(user.theme);
      setAccountValid(
        user.accounts.filter(
          (item: any) => item.role !== "INVITED"
        )
      );
    }
  }, [user]);

  useEffect(() => {
    const url = window.location.href;
    const urlObj = new URL(url);
    const path = urlObj.pathname;
    const pathArray = path
      .split("/")
      .filter(Boolean)
      .slice(1);
    setPathElement(pathArray);
  }, [pathname]);

  const getPath = (index: number) => {
    let path = `/${lang}/`;
    for (let i = 0; i <= index; i++) {
      path += `${pathElement[i]}/`;
    }
    return path;
  };

  return (
    <SidebarProvider className="relative">
      <Sidebar
        variant="inset"
        className="bg-sidebar"
      >
        <SidebarHeader>
          <SidebarMenu>
            {currentAccount ? (
              <SidebarMenuItem>
                <SidebarMenuButton
                  size="lg"
                  asChild
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                      >
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                          <AvatarViewer
                            imageUrl={
                              currentAccount.avatar
                            }
                            name={
                              currentAccount.name
                            }
                          />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-semibold">
                            {currentAccount.name}
                          </span>
                          <span className="truncate text-xs capitalize">
                            {currentAccount.status.toLowerCase()}
                          </span>
                        </div>
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-[15rem] ml-[0.5rem] min-w-56 rounded-lg"
                      side="bottom"
                      align="end"
                      sideOffset={4}
                    >
                      {accountValid?.map(
                        (
                          item: any,
                          index: number
                        ) => (
                          <div
                            key={`item-account-${index}`}
                          >
                            <DropdownMenuLabel
                              className="p-0 font-normal cursor-pointer"
                              onClick={() =>
                                changeCurrentAccount(
                                  index
                                )
                              }
                            >
                              <div className="flex items-center gap-2 p-2 ">
                                <div className="flex aspect-square size-6 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                                  <AvatarViewer
                                    imageUrl={
                                      item.account
                                        .avatar
                                    }
                                    name={
                                      item.account
                                        .name
                                    }
                                  />
                                </div>
                                <div className="flex w-full justify-between items-center w-full text-left text-sm leading-tight ">
                                  <span className="truncate font-thin	max-w-[10rem]">
                                    {
                                      item.account
                                        .name
                                    }
                                  </span>
                                  {currentAccount.id ==
                                    item.accountId && (
                                    <Check className=" ml-2 size-4" />
                                  )}
                                </div>
                              </div>
                            </DropdownMenuLabel>
                            <Separator />
                          </div>
                        )
                      )}
                      <NewWorkspace />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ) : (
              <Skeleton className="h-12 w-full" />
            )}
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarMenu>
              <SidebarMenuItem key={"dashboard"}>
                <SidebarMenuButton asChild>
                  <Link
                    href={`/${lang}/dashboard/`}
                  >
                    <DashboardIcon />
                    <span className="capitalize">
                      {t("dashboard")}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem key={"crm"}>
                <SidebarMenuButton asChild>
                  <Link href={`/${lang}/crm/`}>
                    <BookUser />
                    <span className="capitalize">
                      {t("crm")}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="p-1">
            <Card className="shadow-none">
              <form>
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-sm">
                    Marketing block to do
                  </CardTitle>
                  <CardDescription>
                    Opt-in to receive updates and
                    news about the sidebar.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2.5 p-4">
                  <Button
                    className="w-full "
                    size="sm"
                  >
                    Subscribe
                  </Button>
                </CardContent>
              </form>
            </Card>
          </div>
          <SidebarMenu>
            {user ? (
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <AvatarViewer
                        imageUrl={user.avatar}
                        name={user.name}
                      />
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {user.name}
                        </span>
                        <span className="truncate text-xs">
                          {user.email}
                        </span>
                      </div>
                      <ChevronsUpDown className="ml-auto size-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    side="bottom"
                    align="end"
                    sideOffset={4}
                  >
                    <DropdownMenuLabel className="p-0 font-normal">
                      <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <AvatarViewer
                          imageUrl={user.avatar}
                          name={user.name}
                        />
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-semibold">
                            {user.name}
                          </span>
                          <span className="truncate text-xs">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup className="cursor-pointer">
                      <DropdownMenuItem
                        onClick={
                          openNotificationSidebar
                        }
                        className="cursor-pointer flex justify-between items-center"
                      >
                        <div className="flex gap-2 justify-center items-center">
                          <BellRing size={16} />
                          {t("notifications")}
                        </div>
                        {notificationsNotSeen >
                          0 && (
                          <div className="py-[2px] px-[4px] font-semibold text-white text-xs bg-sidebar-primary rounded-sm">
                            {notificationsNotSeen}
                          </div>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    {currentAccount.status ==
                      "FREE" && (
                      <Link
                        href={`/${lang}/settings/billing`}
                      >
                        <DropdownMenuGroup>
                          <DropdownMenuItem className="cursor-pointer">
                            <Sparkles />
                            {t("upgrade")}
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </Link>
                    )}
                    <DropdownMenuGroup>
                      <Link
                        href={`/${lang}/settings`}
                      >
                        <DropdownMenuItem className="cursor-pointer">
                          <Settings />
                          {t("settings")}
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogOut}
                      className="cursor-pointer"
                    >
                      <LogOut />
                      {t("sign_out")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            ) : (
              <Skeleton className="h-12 w-full" />
            )}
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="text-sidebar-accent-foreground bg-background">
        <header className="flex h-16 shrink-0 items-center gap-2  ">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 h-4"
            />
            {pathElement.length > 0 ? (
              <Breadcrumb>
                <BreadcrumbList>
                  {pathElement.map(
                    (item, index) => (
                      <div
                        className="flex items-center gap-1.5 sm:gap-2.5"
                        key={index}
                      >
                        <BreadcrumbItem
                          key={`breadcrumb-${index}`}
                        >
                          <BreadcrumbLink
                            className="capitalize"
                            href={getPath(index)}
                          >
                            {index ==
                            pathElement.length -
                              1 ? (
                              <BreadcrumbPage>
                                {t(item)}
                              </BreadcrumbPage>
                            ) : (
                              <span>
                                {t(item)}
                              </span>
                            )}
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        {index ==
                        pathElement.length - 1 ? (
                          <></>
                        ) : (
                          <BreadcrumbSeparator>
                            <ChevronRight />
                          </BreadcrumbSeparator>
                        )}
                      </div>
                    )
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            ) : (
              <Skeleton className="h-4 w-32" />
            )}
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
