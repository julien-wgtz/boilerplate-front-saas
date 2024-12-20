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
import { Checkbox } from "@/components/ui/checkbox";
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
import { hasRole } from "@/utils/roleChecker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React, {
  use,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface LeaveProps {
  workspace: any;
}

const Leave: React.FC<LeaveProps> = ({
  workspace,
}) => {
  const t = useTranslations();
  const {
    setCurrentAccount,
    setUser,
    user,
    roleCurrentAccount,
  } = useUserStore();
  const [openModal, setOpenModal] =
    useState(false);
  const [userToUpdate, setUserToUpdate] =
    useState(null);

  const FormSchema = z
    .object({
      workspaceName: z.string({
        message: t("field_required"),
      }),
      userSelected: z.string().nullable(),
    })
    .refine(
      (data) => {
        return (
          data.workspaceName === workspace.name
        );
      },
      {
        message: t("workspace_not_match"),
        path: ["workspaceName"],
      }
    )
    .refine(
      (data) => {
        return (
          data.userSelected !== null ||
          !hasRole(
            [roleCurrentAccount],
            ["OWNER"]
          )
        );
      },
      {
        message: t("user_not_selected"),
        path: ["userSelected"],
      }
    );

  const form = useForm<
    z.infer<typeof FormSchema>
  >({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      workspaceName: "",
      userSelected: null,
    },
  });

  const onSubmit = () => {
    if (
      hasRole([roleCurrentAccount], ["OWNER"]) &&
      userToUpdate
    ) {
      AccountServices.updateRole(
        workspace.id,
        userToUpdate,
        "OWNER"
      ).then((res) => {
        if (res) {
        }
      });
    }

    AccountServices.leave(workspace.id).then(
      (res) => {
        if (res) {
          UserService.me().then((res) => {
            if (res) {
              setUser(res);
              setCurrentAccount(
                res.accounts[0].account
              );
            }
          });
        }
      }
    );
  };

  return (
    <div className="mt-6 ml-3 ">
      <p className="text-md font-medium mb-2">
        {t("leave_workspace")}
      </p>
      <p className="text-sm text-muted-foreground">
        {hasRole(
          [roleCurrentAccount],
          ["OWNER"]
        ) ? (
          <>
            {t(
              "leave_workspace_description_onwer"
            )}
          </>
        ) : (
          <>
            {t(
              "leave_workspace_description_member"
            )}
          </>
        )}
      </p>
      <div className="flex justify-between">
        <Button
          onClick={() => setOpenModal(true)}
          className="mt-4"
          variant="destructive"
        >
          {t("leave")}
        </Button>
      </div>
      <AlertDialog open={openModal}>
        <AlertDialogContent className="max-h-[80vh] overflow-scroll">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-primary">
              {t("leave_workspace")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {hasRole(
                [roleCurrentAccount],
                ["OWNER"]
              ) ? (
                <>
                  {t(
                    "leave_workspace_description_onwer_2"
                  )}
                </>
              ) : (
                <>
                  {t(
                    "leave_workspace_description_member"
                  )}
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                onSubmit
              )}
            >
              <div className="flex flex-1 flex-col gap-4 pb-4">
                <div className="flex flex-col gap-2 px-4 ">
                  <div className="flex items-center p-2 h-12 w-full rounded-lg bg-muted/50 ">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                      <AvatarViewer
                        imageUrl={
                          workspace.avatar
                        }
                        name={workspace.name}
                      />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight ml-2 text-primary">
                      <span className="truncate font-semibold">
                        {workspace?.name}
                      </span>
                      <div className="flex gap-2">
                        <span className="truncate text-xs capitalize">
                          {workspace?.status.toLowerCase()}
                        </span>
                        <span className="truncate text-xs ">
                          -
                        </span>
                        <span className="truncate text-xs ">
                          {
                            workspace?.users
                              .length
                          }{" "}
                          {t(
                            "users_in_workspace"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {hasRole(
                  [roleCurrentAccount],
                  ["OWNER"]
                ) && (
                  <div>
                    <p className="text-primary">
                      {t("select_user")}
                    </p>
                    <div className="flex flex-col gap-2 bg-muted/50 rounded-lg p-2 mx-4 mt-2 max-h-[200px] overflow-scroll">
                      <FormField
                        control={form.control}
                        name="userSelected"
                        render={({ field }) => (
                          <>
                            {workspace.users.map(
                              (
                                userInAccount: any
                              ) =>
                                userInAccount.user
                                  .id !==
                                  user.id && (
                                  <FormItem
                                    className="cursor-pointer"
                                    onClick={() => {
                                      setUserToUpdate(
                                        userInAccount
                                          .user.id
                                      );
                                      form.setValue(
                                        "userSelected",
                                        userInAccount.user.id.toString()
                                      );
                                    }}
                                  >
                                    <div className="flex items-center gap-4 p-2 h-12 w-full rounded-lg bg-secondary ">
                                      <div className="flex justify-center items-center pl-2 ">
                                        <Checkbox
                                          checked={
                                            userToUpdate ===
                                            userInAccount
                                              .user
                                              .id
                                          }
                                          onClick={() => {
                                            setUserToUpdate(
                                              userInAccount
                                                .user
                                                .id
                                            );
                                            form.setValue(
                                              "userSelected",
                                              userInAccount.user.id.toString()
                                            );
                                          }}
                                        />
                                      </div>
                                      {/* //TODO get avatar from db */}
                                      <div className="flex">
                                        <div className="avatar min-h-8 min-w-8">
                                          <AvatarViewer
                                            imageUrl={
                                              userInAccount
                                                .user
                                                .avatar
                                            }
                                            name={
                                              userInAccount
                                                .user
                                                .name
                                            }
                                          />
                                        </div>
                                        <div className="grid flex-1 text-left text-sm leading-tight ml-2 text-primary">
                                          <span className="truncate font-semibold">
                                            {
                                              userInAccount
                                                .user
                                                .email
                                            }
                                          </span>
                                          <div className="flex gap-2">
                                            <span className="truncate text-xs capitalize">
                                              {userInAccount.role.toLowerCase()}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </FormItem>
                                )
                            )}
                          </>
                        )}
                      />
                    </div>
                  </div>
                )}
                <p className="text-xs text-destructive">
                  {
                    form?.formState?.errors
                      ?.userSelected?.message
                  }
                </p>
              </div>

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
              onClick={() => {
                setOpenModal(false);
                form.reset();
                setUserToUpdate(null);
              }}
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

export default Leave;
