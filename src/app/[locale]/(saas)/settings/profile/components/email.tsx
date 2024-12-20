import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import UserService from "@/services/users";

interface EmailProps {
  user: any;
}

const Email: React.FC<EmailProps> = ({
  user,
}) => {
  const t = useTranslations();
  const [isSent, setIsSent] = useState(false);
  const [openModal, setOpenModal] =
    useState(false);
  const [msgEmail, setMsgEmail] = useState("");

  const FormSchema = z.object({
    email: z.string().email({
      message: t("email_not_valid"),
    }),
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
    const update =
      await UserService.askChangeEmail(
        data.email
      );

    if (update) {
      if (update.status === 400) {
        setMsgEmail(t("error_occurred"));
      } else if (update.status === 401) {
        setMsgEmail(t("email_already_exist"));
      } else {
        setIsSent(true);
      }
    }
  };

  return (
    <div className="mt-6 ml-3 ">
      <p className="text-md font-medium mb-2">
        {t("email")}
      </p>
      <Input
        className="mt-1 max-w-[350px]"
        value={user?.email}
        onChange={() => {}}
        placeholder={t("email")}
        disabled
      />
      <div className="flex justify-end">
        <Button
          className="mt-4"
          onClick={() => setOpenModal(true)}
        >
          {t("change_email")}
        </Button>
      </div>
      <AlertDialog open={openModal}>
        <AlertDialogContent>
          {isSent ? (
            <AlertDialogHeader>
              <AlertDialogTitle className="text-primary">
                {t("email_sent")}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {t("email_sented_description")}
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogAction
                  onClick={() =>
                    setOpenModal(false)
                  }
                  className=""
                >
                  {t("confirm")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogHeader>
          ) : (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-primary">
                  {t("ask_change_email")}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {t(
                    "ask_change_email_description"
                  )}
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
                        <FormLabel>
                          {t("email")}
                        </FormLabel>
                        <Input
                          {...field}
                          className="text-primary"
                          placeholder="m@example.com"
                        />
                        <FormMessage>
                          {msgEmail}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() =>
                    setOpenModal(false)
                  }
                  className="text-primary"
                >
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
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Email;
