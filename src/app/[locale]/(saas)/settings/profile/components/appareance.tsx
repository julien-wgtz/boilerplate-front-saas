import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import UserService from '@/services/users';
import useUserStore from '@/stores/userStore';


interface Props {
	user: any;
}

const Appareance: React.FC<Props> = ({ user }) => {
	const t = useTranslations();
	const {setUser} = useUserStore();

	const FormThemeSchema = z.object({
		theme: z.string().default(user.theme),
	})

	const form = useForm<z.infer<typeof FormThemeSchema>>({
		resolver: zodResolver(FormThemeSchema),
		defaultValues: {
            theme: user.theme,
        },
	})

	const onSubmit = async (data: z.infer<typeof FormThemeSchema>) => {
		const update = await UserService.changeTheme(data.theme)
		const newUser = { ...user, theme: data.theme };
		setUser(newUser);
	}

	useEffect(() => {
        form.setValue("theme", user.theme); 
    }, [form]);

	return (
		<div className='mt-6 ml-3 '>
			<p className='text-md font-medium mb-2'>
				{t("apparence")}
			</p>
			<Form {...form}>
				<form onChange={form.handleSubmit(onSubmit)} className="max-w-[200px] space-y-6">
					<FormField
					control={form.control}
					name="theme"
					render={({ field }) => (
						<FormItem>
							<FormLabel >{t("theme")}</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
								</FormControl>
								<SelectContent >
									<SelectItem value="light">{t("light")}</SelectItem>
									<SelectItem value="dark">{t("dark")}</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
					/>
				</form>
			</Form>
		</div>
	);
};

export default Appareance;