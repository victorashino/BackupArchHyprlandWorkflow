import React, { useEffect } from 'react';
import { SplashScreen, Stack, useRootNavigationState, useRouter } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './(home)/homePage/index';
import PixArea from './(home)/pixArea/index';
import ProfileScreen from './(home)/profile/index';

const Tab = createBottomTabNavigator();

export default function Layout() {
  const [fontsLoaded, error] = useFonts({
    'Poppins-Bold': require('../assets/fonts/poppins/Poppins-Bold.ttf'),
    'Poppins-Light': require('../assets/fonts/poppins/Poppins-Light.ttf'),
    'Poppins-Regular': require('../assets/fonts/poppins/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/poppins/Poppins-SemiBold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </AuthProvider>
  );
}

function RootNavigator() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) {
      return;
    }
    if (isAuthenticated) {
      router.replace('/(home)/homePage');
    } else {
      router.replace('/');
    }
  }, [navigationState?.key, isAuthenticated]);

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="PixArea" component={PixArea} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
