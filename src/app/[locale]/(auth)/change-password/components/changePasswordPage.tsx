// app/change-password/components/ChangePasswordPage.tsx

"use client";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import UserService from '@/services/users';
import { useRouter } from 'next/navigation';

const ChangePasswordPage: React.FC<{ isValid: boolean; token: string; params: any }> = ({ isValid, token, params }) => {
	const t = useTranslations();
	const router = useRouter();
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [msgError, setMsgError] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	}

	const handleForgotPassword = async () => {
		if (password !== passwordConfirmation) {
			setMsgError(t("passwords_do_not_match"));
			return;
		}

		setIsLoading(true);
		try {
			const data = await UserService.changePassword(password, token);
			console.log(data)
			if(data.status !== 200) {
				setMsgError(t("error_occurred"));
			} else {
				console.log("Password changed successfully");
				router.push(`/${params.locale}/signin`);
			}
		} catch (error) {
			console.error("Error while changing password", error);
			setMsgError(t("error_occurred"));
		}
		setIsLoading(false);
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
					<h1 className="text-3xl font-bold">{t("reset_password_link")}</h1>
					<p className="text-balance text-muted-foreground">{t("reset_password_desc")}</p>
				</div>
				<form onSubmit={handleSubmit} className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="email">{t("password")}</Label>
						<Input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="email">{t("email_confirm")}</Label>
						<Input
							type="password"
							id="passwordConfirmation"
							value={passwordConfirmation}
							onChange={(e) => setPasswordConfirmation(e.target.value)}
							required
						/>
					</div>
					<div>
						<p className="text-red-500 text-sm">{msgError}</p>
					</div>
					<Button
						type="submit"
						className="w-full"
						onClick={handleForgotPassword}
					disabled={isLoading}
					>
							{isLoading && (
							<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
							)}
						{t("reset_password")}
					</Button>
				</form>
        	</div>
        ) : (
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{t("invalid_link")}</h1>
            <p className="text-balance text-muted-foreground">{t("invalid_link_description")}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChangePasswordPage;
