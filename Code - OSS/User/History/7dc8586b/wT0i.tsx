import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { colors } from '@/src/styles/global';
import { useRouter, usePathname, Href } from 'expo-router';

interface BottomBarButton {
  iconName: string;
  route: Href<string | object>;
  color: string;
}

const BottomBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const buttons: BottomBarButton[] = [
    { iconName: 'house', route: '/(home)/homePage', color: colors.primaryWhite },
    { iconName: 'pix', route: '/(home)/pixArea', color: colors.primaryWhite },
    { iconName: 'credit-card', route: '/(home)/homePage', color: colors.primaryWhite },
    { iconName: 'circle-user', route: '/(home)/profile', color: colors.primaryWhite },
  ];

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => router.replace(button.route)}
          >
            <FontAwesome6
              name={button.iconName}
              size={24}
              color={pathname === button.route ? colors.yellow : button.color}
            />
          </TouchableOpacity>
        ))}
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
