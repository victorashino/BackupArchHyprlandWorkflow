import HeaderAreaHome from '@/src/components/HeaderAreaHome';
import Row from '@/src/components/Row';
import { colors } from '@/src/styles/global';
import fonts from "@/src/styles/fonts"
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, {  } from 'react';
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { styles } from './style';

const ProfilePage = () => {


  return (
    <View style={{ 
        flex: 1
        }}>
      <StatusBar barStyle="dark-content" />
      <Row >
        <TouchableOpacity onPress={() => router.replace('/(home)/homePage')}>
          <FontAwesome6 name="chevron-left" size={20} color={colors.gray} />
        </TouchableOpacity>
        <Text style={[styles.title, fonts.bold24]}>Extrato</Text>
        <TouchableOpacity onPress={() => router.replace('/(home)/notification')}>
          <FontAwesome name="bell" size={20} color={colors.primaryBlue} />
        </TouchableOpacity>
      </Row>
      
    </View>
  );
};

export default ProfilePage;
