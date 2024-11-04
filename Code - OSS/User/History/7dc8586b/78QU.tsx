import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { colors } from '@/src/styles/global';
import { useRouter, usePathname } from 'expo-router';
import styles from './style'

const BottomBar = () => {
    const router = useRouter();
    const currentRoute = usePathname();

    console.log("Current route:", currentRoute);

    const buttons: { iconName: string; route: string }[] = [
        { iconName: 'house', route: '/homePage' },
        { iconName: 'pix', route: '/pixArea' },
        { iconName: 'circle-dollar-to-slot', route: '/deposit' },
        { iconName: 'circle-user', route: '/profile' },
    ];

    const handlePress = (route: string) => {
        if (currentRoute !== route) {
            router.replace(route as any);
        }
    };

    const isCurrentRoute = (buttonRoute: string) => {
        return currentRoute === buttonRoute;
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                {buttons.map((button, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.button}
                        onPress={() => handlePress(button.route)}
                    >
                        <FontAwesome6
                            name={button.iconName}
                            size={24}
                            color={isCurrentRoute(button.route) ? colors.yellow : colors.primaryWhite}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default BottomBar;
