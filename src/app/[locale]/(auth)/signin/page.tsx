"use client";
import React, {
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserService from "../../../../services/users";
import { useTranslations } from "next-intl";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import useUserStore from "@/stores/userStore";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const SignInPage = ({
  params,
}: {
  params: { locale: string };
}) => {
  const [loading, setLoading] = useState(false);
  const { setUser, setCurrentAccount } =
    useUserStore();
  const router = useRouter();
  const t = useTranslations();

  useEffect(() => {
    document.title = t("login");
  }, [t]);

  const FormSchema = z.object({
    email: z.string().email(),
    password: z
      .string({
        required_error: t("field_required"),
      })
      .min(8, {
        message: t("password_min_length"),
      })
      .max(50, {
        message: t("password_max_length"),
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[a-zA-Z\d!@#$%&*-]{8,}$/,
        {
          message: t("password_must_contain"),
        }
      ),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (
    data: z.infer<typeof FormSchema>
  ) => {
    setLoading(true);
    const user = await UserService.login(data);
    if (user.statusCode == 401) {
      form.setError("root", {
        message: t("login_failed"),
      });
    } else {
      setUser(user);
      setCurrentAccount(user.currentAccount);
      router.push(`/${params.locale}/dashboard`);
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }} // Sortie vers la droite
      transition={{ duration: 0.5 }} // Durée de l'animation
    >
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">
            {t("login")}
          </h1>
          <p className="text-balance text-muted-foreground">
            {t("enter_email")}
          </p>
        </div>
        <Form {...form}>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("email")}
                    </FormLabel>
                    <Input
                      {...field}
                      type="email"
                      placeholder="m@example.com"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel htmlFor="password">
                        {t("password")}
                      </FormLabel>
                      <Link
                        href={`/${params.locale}/forgot-password`}
                        className="ml-auto inline-block text-sm underline"
                      >
                        {t("forgot_password")}
                      </Link>
                    </div>
                    <Input
                      {...field}
                      type="password"
                      placeholder="m@example.com"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={form.handleSubmit(
                onSubmit
              )}
              disabled={loading}
            >
              {loading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              {t("login")}
            </Button>
            {form.formState.errors.root && (
              <p className="text-red-500">
                {
                  form.formState.errors.root
                    .message
                }
              </p>
            )}
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          {t("no_account")}{" "}
          <Link
            href={`/${params.locale}/signup`}
            className="underline"
          >
            {t("sign_up")}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default SignInPage;
