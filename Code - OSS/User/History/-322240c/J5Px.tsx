import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
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
import CheckCodeInviteChangePwd from '@/src/components/CheckCodeInviteChangePwd';
import ButtonApp from '@/src/components/ButtonApp';
import InputApp from '@/src/components/InputApp';
import { formatCEP } from '@/src/utils/inputApp.utils';
import { returnOnlyNumbers } from '@/src/utils/returnOnlyNumbers';

const ChangeAddressPage = () => {


  const { register, setRegister, setMessageError } = useAuth();

  const [btnDisable, setBtnDisable] = useState(true);

  useEffect(() => {
    // setZipCode(addressData.zip)
    if (
      register.zip !== '' &&
      register.street !== '' &&
      register.st_number !== '' &&
      register.district !== '' &&
      register.city !== '' &&
      register.uf !== ''
    ) {
      setBtnDisable(false)
    } else {
      setBtnDisable(true)
    }
  }, [
    register.zip,
    register.street,
    register.st_number,
    register.district,
    register.city,
    register.uf
  ])

  const handleSubmit = () => {
    router.push('/(home)/profile/registrationData/final')
  }

  return (
    <ContainerSession
      backHomePage={false}
      titleHeader="Alterar Endereço">
      <View>
        <ScrollView style={{ height: '50%' }}>
          <InputApp
            type="default"
            required={true}
            label="CEP"
            value={formatCEP(register.zip)}
            setState={(e: any) => setRegister((prev) => ({
              ...prev,
              zip: String(returnOnlyNumbers(e))
            }))}
            error={false}
          />
          <InputApp
            type="default"
            required={true}
            label="Logradouro"
            value={register.street}
            setState={(e: any) => setRegister((prev) => ({
              ...prev,
              street: e
            }))}
            error={false}
          />
          <InputApp
            type="default"
            required={true}
            label="Número"
            value={register.st_number}
            setState={(e: any) => setRegister((prev) => ({
              ...prev,
              st_number: e
            }))}
            error={false}
          />
          <InputApp
            type="default"
            required={false}
            label="Complemento"
            value={register.st_comp}
            setState={(e: any) => setRegister((prev) => ({
              ...prev,
              st_comp: e
            }))}
            error={false}
          />
          <InputApp
            type="default"
            required={false}
            label="Bairro"
            value={register.district}
            setState={(e: any) => setRegister((prev) => ({
              ...prev,
              district: e
            }))}
            error={false}
          />
          <InputApp
            type="default"
            required={false}
            label="Cidade"
            value={register.city}
            setState={(e: any) => setRegister((prev) => ({
              ...prev,
              city: e
            }))}
            error={false}
          />
          <InputApp
            type="default"
            required={false}
            label="UF"
            value={register.uf}
            setState={(e: any) => setRegister((prev) => ({
              ...prev,
              uf: e
            }))}
            error={false}
          />
        </ScrollView>
        <View>
          <ButtonApp
            text="Prosseguir"
            color="blue"
            submit={handleSubmit}
            disable={btnDisable}
          />
        </View>
      </View>
    </ContainerSession >
  );
};

export default ChangeAddressPage;
