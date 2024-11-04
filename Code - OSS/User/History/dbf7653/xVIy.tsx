import * as React from 'react';
import '@/styles/global.css';
import { StatusBar, Alert } from 'react-native';
import * as Updates from 'expo-updates';
import Location from 'react-native-location';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from '@/context/AuthContext';
import { Routes } from '@/routes';
import { HomeProvider } from '@/context/HomeContex';
import Toast from 'react-native-toast-message';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import i18n from '@/assets/translate/i18n'; // Importa sua configuração do i18next

// Configure a biblioteca de localização
Location.configure({
  distanceFilter: 100, // Distância mínima em metros para atualizar a localização
});

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export default function App() {
  const [fontsLoaded] = useFonts({
    'PostNoBillsColombo-Bold': require('./assets/fonts/post-no-bills/postnobillscolombo-bold.ttf'),
    'PostNoBillsColombo-Light': require('./assets/fonts/post-no-bills/postnobillscolombo-light.ttf'),
    'PostNoBillsColombo-Medium': require('./assets/fonts/post-no-bills/postnobillscolombo-medium.ttf'),
    'PostNoBillsColombo-Regular': require('./assets/fonts/post-no-bills/postnobillscolombo-regular.ttf'),
    'PostNoBillsColombo-SemiBold': require('./assets/fonts/post-no-bills/postnobillscolombo-semibold.ttf'),
    'Poppins-Bold': require('./assets/fonts/poppins/Poppins-Bold.ttf'),
    'Poppins-Light': require('./assets/fonts/poppins/Poppins-Light.ttf'),
    'Poopins-Regular': require('./assets/fonts/poppins/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/poppins/Poppins-SemiBold.ttf'),
  });

  React.useEffect(() => {
    const updateApp = async () => {
      const { isAvailable } = await Updates.checkForUpdateAsync();

      if (isAvailable) {
        await Updates.fetchUpdateAsync();

        await Updates.reloadAsync();
      }
    };

    updateApp();
  }, []);

  React.useEffect(() => {
    // Solicita permissões de localização
    Location.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'fine',
      },
    }).then(granted => {
      if (granted) {
        // Obtém a localização atual
        Location.getLatestLocation({ timeout: 60000 }).then(location => {
          const { latitude } = location;

          // Ajusta o idioma com base na localização
          // Lógica fictícia: se a latitude estiver em uma faixa específica, define o idioma
          if (latitude > -10 && latitude < 10) {
            i18n.changeLanguage('pt');
          } else if (latitude > 10 && latitude < 20) {
            i18n.changeLanguage('es');
          } else {
            i18n.changeLanguage('en');
          }
        }).catch(error => {
          Alert.alert('Erro', 'Não foi possível obter a localização.');
        });
      } else {
        Alert.alert('Permissão Negada', 'Permissão de localização não concedida.');
      }
    });
  }, []);

  if (!fontsLoaded) {
    return null; // Ou um componente de carregamento
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <HomeProvider>
            <StatusBar barStyle={'light-content'} backgroundColor="#242f5f" />
            <Routes />
          </HomeProvider>
        </AuthProvider>
        <Toast />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
