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
import UserService from "@/services/users";
import useUserStore from "@/stores/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ChangeNameProps {
  user: any;
}

const ChangeName: React.FC<ChangeNameProps> = ({
  user,
}) => {
  const t = useTranslations();
  const { setUser } = useUserStore();

  const FormSchema = z.object({
    name: z.string().min(3, {
      message: t("field_name_min_length"),
    }),
  });

  const form = useForm({
    mode: "onBlur",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: user.name,
    },
  });

  const onSubmit = (
    data: z.infer<typeof FormSchema>
  ) => {
    if (data.name !== user.name) {
      UserService.changeUserName(data.name).then(
        () => {
          UserService.me().then((me) => {
            setUser(me);
          });
        }
      );
    }
  };

  const handleSaveAvatar = (
    blob: Blob,
    fileName: string
  ) => {
    UserService.updateAvatar(blob, fileName).then(
      (res) => {
        UserService.me().then((me) => {
          setUser(me);
        });
      }
    );
  };

  return (
    <div className="flex items-center gap-4 mt-6 mb-6 ml-3">
      <AvatarUploader
        initialAvatar={user.avatar}
        fallbackAvatar={user.name}
        onSave={handleSaveAvatar}
      ></AvatarUploader>

      <div className=" flex flex-col w-full">
        <Form {...form}>
          <form
            onBlur={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className=" flex flex-col w-full">
                  <FormLabel className="text-sm font-medium mb-2">
                    {t("name")}
                  </FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangeName;
