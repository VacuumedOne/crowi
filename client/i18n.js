import i18n from 'i18next'
import LngDetector from 'i18next-browser-languagedetector'
import { reactI18nextModule } from 'react-i18next'

import en from 'locales/en/translation.yml'
import ja from 'locales/ja/translation.yml'

export default () => {
  const lngDetector = new LngDetector()
  lngDetector.addDetector({
    name: 'userSetting',
    lookup(options) {
      const { lang = null } = JSON.parse(document.getElementById('user-context-hydrate').textContent || '{}')
      return lang
    },
    cacheUserLanguage(lng, options) {},
  })

  i18n
    .use(lngDetector)
    .use(reactI18nextModule)
    .init({
      fallbackLng: 'en',
      debug: true,
      interpolation: { escapeValue: false },
      react: {
        wait: false,
        bindI18n: 'languageChanged loaded',
        bindStore: 'added removed',
        nsMode: 'default',
      },
      resources: {
        en: { translation: en },
        ja: { translation: ja },
      },
      detection: {
        order: ['userSetting', 'querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      },
    })
}
