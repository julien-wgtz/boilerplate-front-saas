"use client"

import UserService from '../../../../services/users';
import React, { use, useEffect, useState } from 'react';

interface DashboardPageProps {
	params: {
		lang: string;
	};
}

const DashboardPage: React.FC<DashboardPageProps> =  ({params}) => {

	return (
		<div>
			<h1>Dashboard</h1>
		</div>
	);
};

export default DashboardPage;