import { colors } from '@/src/styles/global';
import fonts from "@/src/styles/fonts"
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { } from 'react';
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { styles } from './style';
import Dropdown from '@/src/components/DropDown';
import DropdownWithText from '@/src/components/DropdownWithText';

const ProfilePage = () => {

    return (
        <View style={{
            flex: 1
        }}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace('/(home)/profile')}>
                    <FontAwesome6 name="x" size={20} color={colors.gray} />
                </TouchableOpacity>
                <Text style={[styles.title, fonts.semiBold16]}>Perguntas frequentes</Text>
            </View>

            <View style={{alignSelf: "center"}}>
                <Text style={fonts.regular16Gray}>
                    Tire suas dúvidas ou entre em contato
                </Text>
                <Text style={fonts.regular16Gray}>
                    com nosso suporte pelo WhatsApp
                </Text>
            </View>

            <DropdownWithText />

        </View>
    );
};

export default ProfilePage;
