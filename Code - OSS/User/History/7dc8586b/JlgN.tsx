import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { colors } from '@/src/styles/global';
import { useRouter, usePathname } from 'expo-router';

const BottomBar = () => {
    const router = useRouter();
    const currentRoute = usePathname(); // Obtém a rota atual

    const buttons: { iconName: string; route: string }[] = [
        { iconName: 'house', route: '/(home)/homePage' },
        { iconName: 'pix', route: '/(home)/pixArea' },
        { iconName: 'circle-dollar-to-slot', route: '/(home)/deposit' },
        { iconName: 'circle-user', route: '/(home)/profile' },
    ];

    const handlePress = (route: string) => {
        router.replace(route as any); // Casting para garantir que o TypeScript aceite o tipo
    };

    const isCurrentRoute = (buttonRoute: string) => {
        return currentRoute.startsWith(buttonRoute); // Verifica se a rota atual começa com a rota do botão
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
                            // Altera a cor do ícone baseado na rota atual usando `isCurrentRoute`
                            color={isCurrentRoute(button.route) ? colors.yellow : colors.primaryWhite}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 0,
        left: '5%',
    },
    container: {
        width: '100%',
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
