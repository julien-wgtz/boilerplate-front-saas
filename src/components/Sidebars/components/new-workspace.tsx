import {
  AlertDialogAction,
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AccountServices from "@/services/account";
import useUserStore from "@/stores/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const NewWorkspace: React.FC = () => {
  const t = useTranslations();
  const { setCurrentAccount } = useUserStore();
  const [openModal, setOpenModal] =
    useState(false);

  const formSchema = z.object({
    workspaceName: z
      .string({
        message: t("field_required"),
      })
      .min(3, {
        message: t("field_min_length", {
          length: 3,
        }),
      }),
  });

  const form = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workspaceName: "",
    },
  });

  const onSubmit = (data: any) => {
    AccountServices.createAccount(
      data.workspaceName
    ).then(async (res) => {
      if (res.status === 200) {
        const account =
          await AccountServices.getCurrentAccount();
        setCurrentAccount(account.data);
        setOpenModal(false);
        form.reset();
        window.location.reload();
      } else {
        form.setError("workspaceName", {
          message: t("error_occurred"),
        });
      }
    });
  };

  return (
    <div>
      <DropdownMenuLabel
        onClick={() => setOpenModal(true)}
        className="p-0 font-normal cursor-pointer"
      >
        <div className="flex items-center gap-2 p-2 ">
          <div className="flex aspect-square size-6 items-center justify-center rounded-lg bg-secondary text-sidebar-primary-foreground">
            <Plus className="size-3 text-primary" />
          </div>
          <div className="flex w-full justify-between items-center w-full text-left text-sm leading-tight ">
            <span className="truncate font-thin	max-w-[10rem]">
              {t("create_new_workspace")}
            </span>
          </div>
        </div>
      </DropdownMenuLabel>
      <AlertDialog
        open={openModal}
        onOpenChange={(state) =>
          setOpenModal(state)
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-primary">
              {t("create_new_workspace")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t(
                "create_new_workspace_description"
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
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
                        "write_workspace_name_to_create"
                      )}
                    </FormLabel>
                    <Input
                      {...field}
                      className="text-primary"
                      autoComplete="off"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-primary">
              {t("cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={form.handleSubmit(
                onSubmit
              )}
            >
              {t("confirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default NewWorkspace;
