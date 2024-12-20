import { SidebarSaas } from "@/components/Sidebars/sidebar";
import UserService from "@/services/users";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const sessionCookie = cookies().get(
    "connect.sid"
  );
  if (!sessionCookie) {
    redirect("/signin");
  }

  const me = await UserService.me(sessionCookie);
  if (me.statusCode == 403) {
    redirect("/signin");
  }

  return (
    <main
      className={`group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar ${me.theme}`}
    >
      <SidebarSaas
        lang={params.locale}
        userFetch={me}
      >
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            lang: params.locale,
          });
        })}
      </SidebarSaas>
    </main>
  );
}
