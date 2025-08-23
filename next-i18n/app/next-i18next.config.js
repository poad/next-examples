export default {
  debug: import.meta.env?.NODE_ENV === 'development',
  i18n: {
    defaultLocale: 'ja',
    locales: ['en', 'ja'],
  },
  react: { useSuspense: false },
};
