// NavBottomBar.tsx

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Definindo as telas das rotas
const HomeScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text>Home Screen</Text>
  </SafeAreaView>
);

const SearchScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text>Search Screen</Text>
  </SafeAreaView>
);

const NotificationsScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text>Notifications Screen</Text>
  </SafeAreaView>
);

const ProfileScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text>Profile Screen</Text>
  </SafeAreaView>
);

// Criando o componente NavBottomBar
const Tab = createBottomTabNavigator();

const NavBottomBar: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#fff', // Cor de fundo da barra de navegação
          borderTopWidth: 0, // Remove a borda superior
          elevation: 0, // Remove a sombra para Android
          shadowOpacity: 0, // Remove a sombra para iOS
          paddingBottom: Platform.OS === 'ios' ? 10 : 0, // Ajuste do padding para iOS
        },
        tabBarLabelStyle: {
          fontSize: 12, // Tamanho da fonte dos labels
        },
        tabBarItemStyle: {
          padding: 0, // Remove o padding dos itens
        },
        headerShown: false, // Remove o cabeçalho padrão
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Estilos básicos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "stretch"
  },
});

export default NavBottomBar;
