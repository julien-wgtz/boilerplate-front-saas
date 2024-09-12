import 'server-only'
 
type Dictionary = {
	[locale: string]: () => Promise<{ products: { cart: string } }>
};

const dictionaries: Dictionary = {
	fr: () => import('./dictionnaries/fr.json').then((module) => module.default),
	en: () => import('./dictionnaries/en.json').then((module) => module.default),
};
 
export const getDictionary = async (locale: string) => dictionaries[locale]()