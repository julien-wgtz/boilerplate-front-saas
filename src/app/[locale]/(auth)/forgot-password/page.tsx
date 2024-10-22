"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import UserService from '@/services/users';
import { ReloadIcon } from '@radix-ui/react-icons';

const ForgotPasswordPage = ({ params }: { params: { locale: string } }) => {
	const [email, setEmail] = useState("");
	const [isSending, setIsSending] = useState(false);
	const [msgError, setMsgError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const t = useTranslations();


	useEffect(() => {
		document.title = t("reset_password");
	}, [t]);

	  
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	}

	const handleForgotPassword = async () => {
		setIsLoading(true);
		try {
			const data = await UserService.resetPassword(email);
			if(data.status == 200) {
				setIsSending(true);
			}
		  } catch (error) {
			setMsgError(t("login_failed_server"));
		  }
		  setIsLoading(false);
	}

	return (
		<motion.div
		initial={{ opacity: 0, x: 100 }}
		animate={{ opacity: 1, x: 0 }}
		exit={{ opacity: 0, x: 100 }}  // Sortie vers la droite
		transition={{ duration: 0.5 }}  // Durée de l'animation
		>
			<div className="mx-auto grid w-[400px] gap-6">
				{isSending ? (
				<div className="grid gap-2 text-center">
					<h1 className="text-3xl font-bold">{t("email_sent")}</h1>
					<p className="text-balance text-muted-foreground">{t("email_sent_description")}</p>
				</div>
				) : (
				<>
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">{t("password_forgot")}</h1>
						<p className="text-balance text-muted-foreground">
							{t("description_forgot_password")}
						</p>
					</div>
					<form onSubmit={handleSubmit} className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">{t("email")}</Label>
							<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							/>
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
				</>
				)}
				<div className="mt-4 text-center text-sm">
					<Link href={`/${params.locale}/signin`} className="underline">
						{t("back_to_login")}
					</Link>
				</div>
			</div>
		</motion.div>
	);
};

export default ForgotPasswordPage;