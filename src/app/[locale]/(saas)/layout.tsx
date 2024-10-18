import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

export default function Layout({
	children,
  }: Readonly<{
	children: React.ReactNode;
  }>) {

	const sessionCookie = cookies().get('connect.sid');

	// Si la session n'est pas présente, rediriger vers /login
	if (!sessionCookie) {
	  redirect('/signin');
	}

	return (
		<div>
        	{children}
		</div>
	);
};

