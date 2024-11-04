// NavBottomBar.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Definindo as telas das rotas
const HomeScreen = () => (
  <View style={styles.container}>
    <Text>Home Screen</Text>
  </View>
);

const SearchScreen = () => (
  <View style={styles.container}>
    <Text>Search Screen</Text>
  </View>
);

const NotificationsScreen = () => (
  <View style={styles.container}>
    <Text>Notifications Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.container}>
    <Text>Profile Screen</Text>
  </View>
);

// Criando o componente NavBottomBar
const Tab = createBottomTabNavigator();

const NavBottomBar: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof MaterialCommunityIcons.glyphMap = 'home';

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Search':
              iconName = 'magnify';
              break;
            case 'Notifications':
              iconName = 'bell';
              break;
            case 'Profile':
              iconName = 'account';
              break;
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NavBottomBar;
