import HeaderAreaHome from '@/src/components/HeaderAreaHome';
import React, {  } from 'react';
import { StatusBar, View } from "react-native";

const ProfilePage = () => {


  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <HeaderAreaHome title="Área PIX" backHomePage />
      
    </View>
  );
};

export default ProfilePage;
