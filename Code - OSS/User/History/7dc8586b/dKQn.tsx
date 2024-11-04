import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { colors } from '@/src/styles/global';
import { useRouter } from 'expo-router';

const BottomBar = () => {
    const router = useRouter();
    
    const [selectedIndex, setSelectedIndex] = useState(0);

    const buttons = [
        { iconName: 'house', route: '/(home)/homePage' },
        { iconName: 'pix', route: '/(home)/pixArea' },
        { iconName: 'circle-dollar-to-slot', route: '/(home)/deposit' },
        { iconName: 'circle-user', route: '/(home)/profile' },
    ];

    const handlePress = (index: number, route: string) => {
        setSelectedIndex(index);
        router.replace(route as any);  // Forçar o tipo string para evitar o erro
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                {buttons.map((button, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.button}
                        onPress={() => handlePress(index, button.route)}
                    >
                        <FontAwesome6
                            name={button.iconName}
                            size={24}
                            color={selectedIndex === index ? colors.yellow : colors.primaryWhite}
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