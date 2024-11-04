import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { router, useFocusEffect } from "expo-router";
import { colors } from "@/src/styles/global";
import fonts from "@/src/styles/fonts";
import BottomBar from "@/src/components/BottomBar";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import UserApi from "@/src/services/UserApi";
import Line from "@/src/components/Line";
import ProfileButton from "@/src/components/Profile/Button";
import * as Clipboard from "expo-clipboard";
import { useAuth } from "@/src/context/AuthContext";
import BiometriaApi from "@/src/services/BiometriaApi";
import Notification from '@/src/components/Profile/Notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Deposit from '@/src/services/Deposit';
import ContainerSession from '@/src/components/ContainerSession';

const ChangePwdCodePage = () => {



  return (
    <ContainerSession
      backHomePage={false}
      titleHeader="Comprovante">
      <View>
        <Text style={fonts.regular16Gray}>
        Para evitar fraudes, enviaremos um código para seu e-mail cadastrado. Insira-o para prosseguir com a alteração da sua senha.
        </Text>
      </View>
    </ContainerSession>
  );
};

export default ChangePwdCodePage;
