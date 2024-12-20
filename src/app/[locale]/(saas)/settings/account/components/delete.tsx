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
import AccountServices from "@/services/account";
import UserService from "@/services/users";
import useUserStore from "@/stores/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface DeleteProps {
  workspace: any;
}

const Delete: React.FC<DeleteProps> = ({
  workspace,
}) => {
  const t = useTranslations();
  const { setCurrentAccount, setUser } =
    useUserStore();
  const [openModal, setOpenModal] =
    useState(false);

  const FormSchema = z
    .object({
      workspaceName: z.string({
        message: t("field_required"),
      }),
    })
    .refine(
      (data) =>
        data.workspaceName === workspace.name,
      {
        message: t("workspace_not_match"),
        path: ["workspaceName"],
      }
    );

  const form = useForm<
    z.infer<typeof FormSchema>
  >({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      workspaceName: "",
    },
  });

  const onSubmit = () => {
    AccountServices.deleteAccount(
      workspace.id
    ).then((res) => {
      setOpenModal(false);
      AccountServices.getCurrentAccount().then(
        (res) => {
          setCurrentAccount(res.data);
          UserService.me().then((result) => {
            setUser(result);
          });
          form.reset();
        }
      );
    });
  };

  return (
    <div className="mt-6 ml-3 ">
      <p className="text-md font-medium mb-2">
        {t("delete_workspace")}
      </p>
      <p className="text-sm text-muted-foreground">
        {t("delete_workspace_description")}
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
              {t("delete_workspace")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("description_delete_workspace")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-col gap-2 px-4">
              <div className="flex items-center p-2 h-12 w-full rounded-lg bg-muted/50 ">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                  <AvatarViewer
                    imageUrl={workspace.avatar}
                    name={workspace.name}
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight ml-2 text-primary">
                  <span className="truncate font-semibold">
                    {workspace.name}
                  </span>
                  <div className="flex gap-2">
                    <span className="truncate text-xs capitalize">
                      {workspace.status.toLowerCase()}
                    </span>
                    <span className="truncate text-xs ">
                      -
                    </span>
                    <span className="truncate text-xs ">
                      {workspace.users.length}{" "}
                      {t("users_in_workspace")}
                    </span>
                  </div>
                </div>
              </div>
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
                name="workspaceName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">
                      {t(
                        "write_workspace_name_to_delete"
                      )}
                    </FormLabel>
                    <Input
                      {...field}
                      className="text-primary"
                      placeholder={workspace.name}
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
