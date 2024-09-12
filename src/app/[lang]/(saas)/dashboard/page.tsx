import { getDictionary } from '@/traductions/dictionaries';
import React from 'react';

interface DashboardPageProps {
	params: {
		lang: string;
	};
}

const DashboardPage: React.FC<DashboardPageProps> = async ({params}) => {
	const {lang} = params;
	const dict = await getDictionary(lang);

	return (
		<div>
			<h1>Dashboard</h1>
			<h2>{dict.products.cart}</h2>
		</div>
	);
};

export default DashboardPage;