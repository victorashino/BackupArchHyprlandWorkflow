import React from 'react';
import { View, Image } from 'react-native';
import { router } from 'expo-router';
import { styles } from './style';
import ButtonApp from '@/src/components/ButtonApp';

export default function AuthIndex() {

  const handleOpenAccountRedirect = async () => {
    router.push('/(auth)/register')
  }

  const handleLoginRedirect = async () => {
    router.push('/(auth)/login')
  }

  return (
    <View style={styles.container}>

      <View style={styles.containerLogo}>
        <Image source={require("../../assets/pages/auth/logoInitial.png")} />
      </View>

      <View style={styles.containerButtons}>
        <ButtonApp color='blue' text='Abrir conta' submit={handleOpenAccountRedirect} />
        <ButtonApp color='white' text='Já tenho uma conta' submit={handleLoginRedirect} />
      </View>

    </View>
  );
}