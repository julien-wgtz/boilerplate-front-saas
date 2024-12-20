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
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import AccountServices from "@/services/account";
import useUserStore from "@/stores/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ActionDataTable: React.FC = () => {
  const t = useTranslations();

  const {
    user,
    currentAccount,
    setCurrentAccount,
  } = useUserStore();
  const { toast } = useToast();
  const [msgError, setMsgError] = useState("");
  const [isLoading, setIsLoading] =
    useState(false);
  const [openModal, setOpenModal] =
    useState(false);

  const FormSchema = z
    .object({
      email: z.string().email({
        message: t("email_not_valid"),
      }),
    })
    .refine((data) => data.email !== user.email, {
      message: t("user_already_add"),
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

  const onSubmit = async (
    data: z.infer<typeof FormSchema>
  ) => {
    setIsLoading(true);
    await AccountServices.inviteUser(
      data.email,
      currentAccount.id
    ).then(async (res) => {
      if (res.status === 402) {
        setMsgError(t("user_not_found"));
      } else if (res.status === 403) {
        setMsgError(t("user_already_add"));
      } else if (res.status === 200) {
        setOpenModal(false);
        toast({
          description: t.markup(
            "user_invited_description",
            {
              email: data.email,
              workspace: currentAccount.name,
              important: (chunks) =>
                `<strong class="font-black">${chunks}</strong>`,
            }
          ),
        });

        form.reset();
        await AccountServices.getCurrentAccount().then(
          (data) => {
            setCurrentAccount(data.data);
          }
        );
      } else {
        setMsgError(t("error_append"));
      }
      setIsLoading(false);
    });
  };

  return (
    <div className="flex items-center justify-end py-4">
      <Button onClick={() => setOpenModal(true)}>
        <Plus className="mr-2" />{" "}
        {t("add_member")}
      </Button>
      <AlertDialog open={openModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-primary">
              {t("add_member")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("add_member_description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                onSubmit
              )}
              className="space-y-6"
              id="form_email"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">
                      {t("email")}
                    </FormLabel>
                    <Input
                      {...field}
                      className="text-primary"
                      placeholder="m@example.com"
                    />
                    <FormMessage>
                      {msgError}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="text-primary"
              onClick={() => setOpenModal(false)}
              disabled={isLoading}
            >
              {t("cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={form.handleSubmit(
                onSubmit
              )}
              disabled={isLoading}
            >
              {t("send")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ActionDataTable;
