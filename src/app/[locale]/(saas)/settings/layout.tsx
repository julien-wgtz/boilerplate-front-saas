"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  usePathname,
  useRouter,
} from "next/navigation";
import React, { useEffect } from "react";
import { hasRole } from "@/utils/roleChecker";
import useUserStore from "@/stores/userStore";

const Layout: React.FC = ({
  children,
  params,
}: any) => {
  const pathname = usePathname();
  const router = useRouter();
  const [lastPathname, setLastPathname] =
    React.useState("");
  const t = useTranslations();
  const { roleCurrentAccount } = useUserStore();

  useEffect(() => {
    const pathArray = pathname.split("/");
    const lastPath = pathArray.filter(
      (path) => path !== ""
    );
    if (
      lastPath[lastPath.length - 1] == "settings"
    )
      return router.push(
        `/${params.locale}/settings/profile`
      );
    setLastPathname(
      lastPath[lastPath.length - 1]
    );
  }, [pathname]);

  return (
    <div className="min-h-full">
      <NavigationMenu className="pl-4 z-0">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link
              href={`/${params.locale}/settings/profile`}
              legacyBehavior
              passHref
            >
              {lastPathname == "profile" ? (
                <NavigationMenuLink
                  data-active
                  className={`${navigationMenuTriggerStyle()}`}
                >
                  {t("profile")}
                </NavigationMenuLink>
              ) : (
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()}`}
                >
                  {t("profile")}
                </NavigationMenuLink>
              )}
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href={`/${params.locale}/settings/account`}
              legacyBehavior
              passHref
            >
              {lastPathname == "account" ? (
                <NavigationMenuLink
                  data-active
                  className={`${navigationMenuTriggerStyle()}`}
                >
                  {t("account")}
                </NavigationMenuLink>
              ) : (
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()}`}
                >
                  {t("account")}
                </NavigationMenuLink>
              )}
            </Link>
          </NavigationMenuItem>
          {hasRole(
            [roleCurrentAccount],
            ["ADMIN", "OWNER"]
          ) && (
            <NavigationMenuItem>
              <Link
                href={`/${params.locale}/settings/billing`}
                legacyBehavior
                passHref
              >
                {lastPathname == "billing" ? (
                  <NavigationMenuLink
                    data-active
                    className={`${navigationMenuTriggerStyle()}`}
                  >
                    {t("billing")}
                  </NavigationMenuLink>
                ) : (
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()}`}
                  >
                    {t("billing")}
                  </NavigationMenuLink>
                )}
              </Link>
            </NavigationMenuItem>
          )}
          <NavigationMenuItem>
            <Link
              href={`/${params.locale}/settings/member`}
              legacyBehavior
              passHref
            >
              {lastPathname == "member" ? (
                <NavigationMenuLink
                  data-active
                  className={`${navigationMenuTriggerStyle()}`}
                >
                  {t("member")}
                </NavigationMenuLink>
              ) : (
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()}`}
                >
                  {t("member")}
                </NavigationMenuLink>
              )}
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className=" p-4 pt-6">{children}</div>
    </div>
  );
};

export default Layout;
