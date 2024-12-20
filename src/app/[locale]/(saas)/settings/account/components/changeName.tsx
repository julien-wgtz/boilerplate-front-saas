import AvatarUploader from "@/components/avatars/avatarUploader";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
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
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "use-intl";
import { z } from "zod";

interface ChangeNameProps {
  workspace: any;
}

const ChangeName: React.FC<LeaveProps> = ({
  workspace,
}) => {
  const t = useTranslations();
  const {
    roleCurrentAccount,
    setCurrentAccount,
    setUser,
  } = useUserStore();

  const FormSchema = z.object({
    name: z
      .string()
      .min(3, { message: t("field_min_length") }),
  });

  const form = useForm({
    mode: "onBlur",

    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: workspace.name,
    },
  });

  const onSubmit = async (data: any) => {
    if (data.name !== workspace.name) {
      AccountServices.changeName(
        data.name,
        workspace.id
      ).then((res) => {
        if (res.status === 403) {
          form.setError("name", {
            message: t("dont_have_permission"),
          });
        }
        AccountServices.getCurrentAccount().then(
          (account) => {
            setCurrentAccount(account.data);
          }
        );
      });
    }
  };

  const handleSaveAvatar = (
    blob: Blob,
    fileName: string
  ) => {
    AccountServices.updateAvatar(
      blob,
      fileName,
      workspace.id
    ).then((res) => {
      AccountServices.getCurrentAccount().then(
        (account) => {
          setCurrentAccount(account.data);
        }
      );
      UserService.me().then((res) => {
        setUser(res);
      });
    });
  };

  return (
    <div className="   mt-6 mb-6 ml-3">
      <Form {...form}>
        <form
          onBlur={form.handleSubmit(onSubmit)}
          className="flex items-center gap-4"
        >
          <AvatarUploader
            initialAvatar={workspace.avatar}
            fallbackAvatar={workspace.name}
            disabled={
              !hasRole(
                [roleCurrentAccount],
                ["OWNER", "ADMIN"]
              )
            }
            onSave={handleSaveAvatar}
          ></AvatarUploader>

          <div className=" flex flex-col w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium mb-2">
                    {t("name")}
                  </FormLabel>
                  <Input
                    {...field}
                    disabled={
                      !hasRole(
                        [roleCurrentAccount],
                        ["OWNER", "ADMIN"]
                      )
                    }
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangeName;
