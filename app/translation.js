import i18n from 'i18n-js';

i18n.translations = {
  en: require("./translations/en.json"),
  de: require("./translations/de.json"),
};

// Set the locale once at the beginning of your app.


i18n.locale = 'de';
// i18n.locale = Platform.OS === 'ios'
//         ? NativeModules.SettingsManager.settings.AppleLocale ||
//           NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
//         : NativeModules.I18nManager.localeIdentifier;;
i18n.fallbacks = true;


export default function localize (key) {
	return i18n.t(key);
}