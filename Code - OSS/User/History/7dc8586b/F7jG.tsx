import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { colors } from '@/src/styles/global';
import { useRouter, usePathname, Href } from 'expo-router';

const hrefToPath = (href: Href): string => {
  return typeof href === 'string' ? href : href.pathname || '';
};

interface BottomBarButton {
  iconName: string;
  route: Href;
  color: string;
}

const BottomBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Definindo os botões
  const buttons: BottomBarButton[] = [
    { iconName: 'house', route: '/(home)/homePage', color: colors.primaryWhite },
    { iconName: 'pix', route: '/(home)/pixArea', color: colors.primaryWhite },
    { iconName: 'credit-card', route: '/(home)/homePage', color: colors.primaryWhite },
    { iconName: 'circle-user', route: '/(home)/profile', color: colors.primaryWhite },
  ];

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {buttons.map((button, index) => {
          // Converta Href para string para comparação
          const buttonPath = hrefToPath(button.route);
          const isActive = pathname === buttonPath;

          return (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => router.replace(button.route)}
            >
              <FontAwesome6
                name={button.iconName}
                size={24}
                color={isActive ? colors.yellow : button.color} // Muda a cor se estiver ativo
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'flex-end',
  },
  container: {
    width: 365,
    height: 78,
    alignSelf: "center",
    backgroundColor: colors.primaryBlue,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-around',
    marginBottom: 18,
  },
  button: {
    alignItems: 'center',
  }
});

export default BottomBar;
