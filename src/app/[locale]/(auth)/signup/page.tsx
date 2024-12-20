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
import { Checkbox } from "@/components/ui/checkbox";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [terms, setTerms] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser, setCurrentAccount } =
    useUserStore();
  const router = useRouter();
  const t = useTranslations();

  useEffect(() => {
    document.title = t("signup");
  }, [t]);

  // const handleLogin = async () => {

  //   setLoading(true);
  //   const credentials = {
  //     email,
  //     password,
  //     name,
  //     lang: params.locale,
  //   };
  //   try {
  //     const data = await UserService.signup(
  //       credentials
  //     );
  //     setMsgError("");
  //     if (data.status == 400) {
  //       setMsgError(t("user_exists"));
  //     } else {
  //       setUser(data.userAlldata);
  //       setCurrentAccount(
  //         data.userAlldata.currentAccount
  //       );
  //       router.push(
  //         `/${params.locale}/dashboard`
  //       );
  //     }
  //   } catch (error) {
  //     setMsgError(t("signup_failed_server"));
  //   }

  //   setLoading(false);
  // };

  const FormSchema = z.object({
    name: z.string().min(3, {
      message: t("field_name_min_length"),
    }),
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
    accept: z.boolean().refine(
      (value) => {
        return value === true;
      },
      {
        message: t("terms_error"),
      }
    ),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      accept: false,
    },
  });

  const onSubmit = async (
    data: z.infer<typeof FormSchema>
  ) => {
    setLoading(true);
    const credentials = {
      ...data,
      lang: params.locale,
    };
    await UserService.signup(credentials).then(
      (res) => {
        if (res.status == 400) {
          form.setError("root", {
            message: t("user_exists"),
          });
        } else {
          setUser(res.userAlldata);
          setCurrentAccount(
            res.userAlldata.currentAccount
          );
          router.push(
            `/${params.locale}/dashboard`
          );
        }
      }
    );
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
            {t("signup")}
          </h1>
          <p className="text-balance text-muted-foreground">
            {t("signup_description")}
          </p>
        </div>
        <Form {...form}>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>
                        {t("name")}
                      </FormLabel>
                    </div>
                    <Input
                      {...field}
                      type="text"
                      placeholder="John Doe"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>
                        {t("email")}
                      </FormLabel>
                    </div>
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
                      <FormLabel>
                        {t("password")}
                      </FormLabel>
                    </div>
                    <Input
                      {...field}
                      type="password"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2 ">
              <FormField
                control={form.control}
                name="accept"
                render={({ field }) => (
                  <FormItem>
                    <Checkbox
                      checked={form.getValues(
                        "accept"
                      )}
                      onClick={() => {
                        form.setValue(
                          "accept",
                          !form.getValues(
                            "accept"
                          )
                        );
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                      className="mr-2"
                      required
                    />
                    <FormLabel
                      className="cursor-pointer"
                      onClick={() => {
                        form.setValue(
                          "accept",
                          !form.getValues(
                            "accept"
                          )
                        );
                      }}
                    >
                      {t("terms")}
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <p className="text-red-500 text-sm">
                {form.formState.errors.root && (
                  <p className="text-red-500">
                    {
                      form.formState.errors.root
                        .message
                    }
                  </p>
                )}
              </p>
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
              {t("signup_button")}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm ">
          {t("already_account")}{" "}
          <Link
            href={`/${params.locale}/signin`}
            className="underline"
          >
            {t("login_link")}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default SignInPage;
