"use client"

import UserService from '../../../../services/users';
import React, { use, useEffect, useState } from 'react';

interface DashboardPageProps {
	params: {
		lang: string;
	};
}

const DashboardPage: React.FC<DashboardPageProps> =  ({params}) => {
	const {lang} = params;
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			const me = await UserService.me();
			setUser(me);
		};
		fetchUser();
	}, []);

	return (
		<div>
			<h1>Dashboard</h1>
			<h2>{user?.email}</h2>
		</div>
	);
};

export default DashboardPage;