import HeaderAreaHome from '@/src/components/HeaderAreaHome';
import React, {  } from 'react';
import { StatusBar, View } from "react-native";

const ProfilePage = () => {


  return (
    <View style={{ flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "center", }}>
      <StatusBar barStyle="dark-content" />
      <HeaderAreaHome title="Perguntas frequentes" backHomePage />
      
    </View>
  );
};

export default ProfilePage;
