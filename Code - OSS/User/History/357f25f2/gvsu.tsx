import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: { "welcome": "Welcome" } },
      es: { translation: { "welcome": "Bienvenido" } },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

const LanguageManager = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);

      const userLanguage = coords.longitude > 0 ? 'en' : 'es';
      i18n.changeLanguage(userLanguage);
    })();
  }, []);

  return (
    <>
      {children}
    </>

  );
};

export default LanguageManager;
