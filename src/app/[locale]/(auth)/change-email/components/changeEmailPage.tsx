// app/change-password/components/ChangePasswordPage.tsx

"use client";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import UserService from '@/services/users';

const ChangeEmailPage: React.FC<{ isValid: boolean; token: string; params: any }> = ({ isValid, token, params }) => {
	const t = useTranslations();
	const router = useRouter();
  if(isValid !== false) {
    const change = UserService.updateEmail(token);
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto grid w-[400px] gap-6">
        {isValid ? (
			<div className="mx-auto grid w-[400px] gap-6">
				<div className="grid gap-2 text-center">
					<h1 className="text-3xl font-bold">{t("reset_email_title")}</h1>
					<p className="text-balance text-muted-foreground">{t("reset_email_desc")}</p>
					<Button
						onClick={() => router.push(`/${params.locale}/dashboard`)}
						className="w-full mt-4"
					>
						{t("dashboard")}
					</Button>
				</div>
        	</div>
        ) : (
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{t("invalid_link")}</h1>
            <p className="text-balance text-muted-foreground">{t("invalid_link_email_description")}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChangeEmailPage;
