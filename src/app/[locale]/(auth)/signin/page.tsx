"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserService from "../../../../services/users";
import { useTranslations } from "next-intl";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from 'next/navigation';
import useUserStore from "@/stores/userStore";

const SignInPage = ({ params }: { params: { locale: string } }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msgError, setMsgError] = useState("");
  const [loading, setLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();
  const t = useTranslations();

  const handleLogin = async () => {
    setLoading(true);
    const credentials = { email, password };
    try {
      const data = await UserService.login(credentials);
      setMsgError("");
      if(data.statusCode == 401) {
        setMsgError(t("login_failed"));
      } else {
        setUser(data);
        console.log(data)
        router.push(`/${params.locale}/dashboard`);
      }
    } catch (error) {
      setMsgError(t("login_failed_server"));
    }
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  }

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">{t("login")}</h1>
        <p className="text-balance text-muted-foreground">
          {t("enter_email")}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">{t("password")}</Label>
            <Link
              href="/forgot-password"
              className="ml-auto inline-block text-sm underline"
            >
              {t("forgot_password")}
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <p className="text-red-500 text-sm">{msgError}</p>
        </div>
        <Button 
          type="submit"
          className="w-full"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading && (
             <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          {t("login")}
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        {t("no_account")}{" "}
        <Link href={`${params.locale}/signup`} className="underline">
          {t("sign_up")}
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
