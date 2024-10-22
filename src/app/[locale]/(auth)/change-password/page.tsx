import { createTranslator, useTranslations } from 'next-intl';
import ChangePasswordPage from './components/changePasswordPage';
import TokenServices from '@/services/tokens';

export default async function Page({ searchParams, params }: any) {
  const { token } = searchParams;

  let isValid = false;

  if (token) {
    try {
      isValid = await TokenServices.validateToken(token, 'resetPassword');
    } catch (error) {
      console.error("Erreur lors de la validation du token", error);
    }
  }

  // Passer le résultat de la validation au composant
  return <ChangePasswordPage isValid={isValid} token={token} params={params} />;
}

export async function generateMetadata({ params }: any) {
  const locale = params.locale || 'en'; // Récupérer la langue courante
  const messages = (await import(`/locales/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });

  return {
    title: t('reset_password'),
  };
}