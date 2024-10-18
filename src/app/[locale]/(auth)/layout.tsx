import Image from 'next/image';
import { createClient } from 'pexels';
import React from 'react';


export default async function Layout({
	children,
  }: Readonly<{
	children: React.ReactNode;
  }>) {

	const clientPexel = createClient(process.env.NEXT_PUBLIC_PEXEL_API_KEY)
	let random = Math.floor(Math.random() * 10);
	let photos;
	try {
		const response = await clientPexel.photos.search({
			per_page: 10,
			query: "night city"
		});
		photos = response.photos;
	} catch (error) {
		random = 0
		photos = [
			{
				src: {
					original: "/auth/background.webp"
				}
			}
		];
	}

	return (
		<div className="w-full h-screen	 lg:grid lg:grid-cols-2 ">
		<div className="flex items-center justify-center py-12">
			{children}
		</div>
		<div className="relative hidden bg-muted lg:block">
		  <Image
			src={photos[random].src.original}
			alt="Image"
			fill={true}
			objectFit='cover'
			className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
		  />
		</div>
	  </div>
	);
};

