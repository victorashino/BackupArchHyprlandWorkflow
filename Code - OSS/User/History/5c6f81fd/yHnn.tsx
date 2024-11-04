import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './style';
import { FontAwesome6 } from '@expo/vector-icons';
import { colors } from '@/src/styles/global';
import fonts from "@/src/styles/fonts"
import Line from '../Line';

interface ContentProps {
    title: string,
    response: string
}

export default function DropdownWithText({ title, response }: ContentProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
                <Text style={[styles.dropdownText, fonts.semiBold16]}>{title}</Text>
                {isOpen && (
                    <FontAwesome6 name="chevron-up" size={14} color={colors.primaryBlue} />
                ) || 
                    <FontAwesome6 name="chevron-down" size={14} color={colors.primaryBlue} />
                }
            </TouchableOpacity>

            {isOpen && (
                <Text style={[styles.revealedText, fonts.regular16Gray]}>
                    {response}
                </Text>
            )}

            <Line color={colors.gray} width={335} height={2} marginTop={24} />
        </View>
    );
};
