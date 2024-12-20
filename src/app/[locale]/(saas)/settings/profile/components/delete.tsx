import AvatarViewer from "@/components/avatars/avatarViewer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import UserService from "@/services/users";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTranslations } from "next-intl";
import React, {
  use,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface DeleteProps {
  user: any;
}

const Delete: React.FC<DeleteProps> = ({
  user,
}) => {
  const t = useTranslations();
  const [openModal, setOpenModal] =
    useState(false);
  const [accounts, setAccounts] =
    useState<any>(null);

  const FormSchema = z
    .object({
      email: z.string().email({
        message: t("email_not_valid"),
      }),
    })
    .refine((data) => data.email === user.email, {
      message: t("email_not_match"),
      path: ["email"],
    });

  const form = useForm<
    z.infer<typeof FormSchema>
  >({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = () => {
    UserService.deleteUser().then(() => {
      window.location.href = "/";
    });
  };

  useEffect(() => {
    UserService.accounts().then((data) => {
      setAccounts(
        data.user.accounts.filter(
          (account: any) =>
            account.role === "OWNER" &&
            account.account.users.length === 1
        )
      );
    });
  }, [user]);

  return (
    <div className="mt-6 ml-3 ">
      <p className="text-md font-medium mb-2">
        {t("delete_account")}
      </p>
      <p className="text-sm text-muted-foreground">
        {t("delete_account_description")}
      </p>
      <div className="flex justify-between">
        <Button
          onClick={() => setOpenModal(true)}
          className="mt-4"
          variant="destructive"
        >
          {t("delete")}
        </Button>
      </div>
      <AlertDialog open={openModal}>
        <AlertDialogContent className="max-h-[80vh] overflow-scroll">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-primary">
              {t("delete_account")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t(
                "description_all_delete_account"
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-1 flex-col gap-4">
            <p className="text-sm text-primary">
              {t("account_will_be_delete")}
            </p>
            <div className="flex flex-col gap-2 px-4">
              {user.accounts.map(
                (data, index) => (
                  <div
                    key={index}
                    className="flex items-center p-2 h-12 w-full rounded-lg bg-muted/50 "
                  >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                      <AvatarViewer
                        imageUrl={
                          data.account.avatar
                        }
                        name={data.account.name}
                      />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight ml-2 text-primary">
                      <span className="truncate font-semibold">
                        {data.account.name}
                      </span>
                      <span className="truncate text-xs capitalize">
                        {data.account.status.toLowerCase()}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                onSubmit
              )}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">
                      {t("write_email_to_delete")}
                    </FormLabel>
                    <Input
                      {...field}
                      className="text-primary"
                      placeholder={user.email}
                      autoComplete="off"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setOpenModal(false)}
              className="text-primary"
            >
              {t("cancel")}
            </AlertDialogCancel>
            <Button
              onClick={form.handleSubmit(
                onSubmit
              )}
              variant={"destructive"}
            >
              {t("confirm")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Delete;
