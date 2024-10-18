import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['images.pexels.com'],
	  },
	  trailingSlash: true,
};

export default withNextIntl(nextConfig);

