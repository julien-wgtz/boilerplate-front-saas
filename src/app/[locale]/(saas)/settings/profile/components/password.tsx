import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserService from "@/services/users";
import { ReloadIcon } from "@radix-ui/react-icons";

interface PasswordFormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Password: React.FC = () => {
  const t = useTranslations();
  const [msgError, setMsgError] = useState("");
  const [msgSuccess, setMsgSuccess] =
    useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const FormSchema = z
    .object({
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
      confirmPassword: z.string({
        required_error: t("field_required"),
      }),
      oldPassword: z.string().min(1, {
        message: t("field_required"),
      }),
    })
    .refine(
      (data) =>
        data.password === data.confirmPassword,
      {
        message: t("passwords_do_not_match"),
        path: ["confirmPassword"],
      }
    )
    .refine(
      (data) =>
        data.oldPassword !== data.password,
      {
        message: t("passwords_same"),
        path: ["password"],
      }
    );

  const form = useForm<
    z.infer<typeof FormSchema>
  >({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      oldPassword: "",
    },
  });

  const onSubmit = async (
    data: z.infer<typeof FormSchema>
  ) => {
    setIsLoaded(true);
    const update =
      await UserService.changePassword(
        data.oldPassword,
        data.password
      );
    if (update) {
      if (
        update.status === 401 ||
        update.status === 400
      ) {
        setMsgError(t("error_occurred"));
        setMsgSuccess("");
      } else if (update.status === 402) {
        setMsgError(t("old_password_incorrect"));
        setMsgSuccess("");
      } else {
        setMsgSuccess(t("password_updated"));
        setMsgError("");
      }
    }
    setIsLoaded(false);
  };

  return (
    <div className="mt-6 ml-3 ">
      <p className="text-md font-medium mb-2">
        {t("password")}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-[350px] space-y-6"
        >
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("old_password")}
                </FormLabel>
                <Input
                  {...field}
                  type="password"
                  autoComplete="current-password"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("new_password")}
                </FormLabel>
                <Input
                  {...field}
                  type="password"
                  autoComplete="new-password"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("confirm_password")}
                </FormLabel>
                <Input
                  {...field}
                  type="password"
                  autoComplete="new-password"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
        {msgError && (
          <p className="text-red-500 text-sm mt-4">
            {msgError}
          </p>
        )}
        {msgSuccess && (
          <p className="text-green-500 text-sm mt-4">
            {msgSuccess}
          </p>
        )}
      </Form>
      <div className="flex justify-end">
        {isLoaded ? (
          <Button className="mt-4" disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            {t("save")}
          </Button>
        ) : (
          <Button
            className="mt-4"
            onClick={form.handleSubmit(onSubmit)}
          >
            {t("save")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Password;
