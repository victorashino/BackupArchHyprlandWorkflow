import HeaderAreaHome from '@/src/components/HeaderAreaHome';
import React, {  } from 'react';
import { StatusBar, View } from "react-native";

const ProfilePage = () => {


  return (
    <View style={{ 
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 54
     }}>
      <StatusBar barStyle="dark-content" />
      <HeaderAreaHome title="Perguntas frequentes" backHomePage />
      
    </View>
  );
};

export default ProfilePage;
