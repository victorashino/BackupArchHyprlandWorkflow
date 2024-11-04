import { SplashScreen, Stack, useRootNavigationState, useRouter } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { ExtractProvider } from '../context/ExtractContext';

export default function Layout() {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Bold": require("../assets/fonts/poppins/Poppins-Bold.ttf"),
    "Poppins-Light": require("../assets/fonts/poppins/Poppins-Light.ttf"),
    "Poopins-Regular": require("../assets/fonts/poppins/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/poppins/Poppins-SemiBold.ttf"),
  });
  // useEffect(() => {
  //   StyleApi
  // }, [])

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <ExtractProvider>
      <AuthProvider>
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </AuthProvider>
    </ExtractProvider>
  );
}

function RootNavigator() {
  const { isAuthenticated, resendOnBoarding } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      if (resendOnBoarding) {
        router.replace('/(home)/onBoarding');
      } else {
        router.replace('/(home)/homePage');
      }
    } else {
      router.replace('/');
    }
  }, [isAuthenticated, resendOnBoarding]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
