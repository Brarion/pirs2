import { useRouter } from 'next/router';
import { en, ru } from '@locales';

export enum Locale {
  en = 'en',
  ru = 'ru',
}

export const useLocale = () => {
  const router = useRouter();

  return router.locale === Locale.ru ? ru : en;
};
