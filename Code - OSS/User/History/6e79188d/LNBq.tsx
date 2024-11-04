import HeaderAreaHome from '@/src/components/HeaderAreaHome';
import React, {  } from 'react';
import { StatusBar, View } from "react-native";

const ProfilePage = () => {


  return (
    <View style={{ 
        flex: 1,
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "#00F"
     }}>
      <StatusBar barStyle="dark-content" />
      <HeaderAreaHome title="Perguntas frequentes" backHomePage />
      
    </View>
  );
};

export default ProfilePage;
