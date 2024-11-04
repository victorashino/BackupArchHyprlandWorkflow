import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '@/pages/tabs/home'
import Companies from '@/pages/companies/companies'
import InfoCreateCompany from '@/pages/companies/createCompanie/infoCreateCompany'
import CreateCompanyForm from '@/pages/companies/createCompanie/createCompanyForm'
import AddressCompanyForm from '@/pages/companies/createCompanie/addressCompanyForm'
import ConfirmCreateCompany from '@/pages/companies/createCompanie/confirmCreateCompany'
import LoginPortalWeb from '@/pages/companies/qrCode/loginPortalWeb'
import AreaPixHome from '@/pages/areaPix'
import MyPixKey from '@/pages/areaPix/minhasChaves'
import CreatePixKey from '@/pages/areaPix/minhasChaves/createPixKey'
import InfoPaymentPix from '@/pages/areaPix/infoPaymentPix'
import RevisionPaymentPix from '@/pages/areaPix/infoPaymentPix/revisionPaymentPix'
import ConfirmPasswordPix from '@/pages/areaPix/infoPaymentPix/revisionPaymentPix/confirmPassword'
import PixReceipt from '@/pages/areaPix/infoPaymentPix/revisionPaymentPix/confirmPassword/PixReceipt'
import MeusContatos from '@/pages/areaPix/meusContatos'
import HomePagamentos from '@/pages/pagamento'
import ScanCodeBar from '@/pages/pagamento/scanCodeBar'
import ScanQrCodePix from '@/pages/pagamento/scanQrCodePix'
import BarCodeDigit from '@/pages/pagamento/barCode'
import ExtratoHome from '@/pages/extrato'

const Stack = createNativeStackNavigator()

export default function StackHome() {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="mainHome"
        options={{ headerShown: false }}
        component={Home}
      />
      {/* Telas de empresas */}
      <Stack.Screen
        name="companies"
        options={{ headerShown: false }}
        component={Companies}
      />
      <Stack.Screen
        name="infoCreateCompany"
        options={{ headerShown: false }}
        component={InfoCreateCompany}
      />
      <Stack.Screen
        name="createCompanyForm"
        options={{ headerShown: false }}
        component={CreateCompanyForm}
      />
      <Stack.Screen
        name="addressCompanyForm"
        options={{ headerShown: false }}
        component={AddressCompanyForm}
      />
      <Stack.Screen
        name="confirmCreateCompany"
        options={{ headerShown: false }}
        component={ConfirmCreateCompany}
      />
      <Stack.Screen
        name="qrCodeComapanyLogin"
        options={{ headerShown: false }}
        component={LoginPortalWeb}
      />
      {/* Telas de area pix */}
      <Stack.Screen
        name="areaPixHome"
        options={{ headerShown: false }}
        component={AreaPixHome}
      />
      <Stack.Screen
        name="keyPix"
        options={{ headerShown: false }}
        component={MyPixKey}
      />
      <Stack.Screen
        name="createPixKey"
        options={{ headerShown: false }}
        component={CreatePixKey}
      />
      <Stack.Screen
        name="infoPaymentPix"
        options={{ headerShown: false }}
        component={InfoPaymentPix}
      />
      <Stack.Screen
        name="revisionPaymentPix"
        options={{ headerShown: false }}
        component={RevisionPaymentPix}
      />
      <Stack.Screen
        name="confirmPasswordPix"
        options={{ headerShown: false }}
        component={ConfirmPasswordPix}
      />
      <Stack.Screen
        name="RecipientPix"
        options={{ headerShown: false }}
        component={PixReceipt}
      />
      <Stack.Screen
        name="ContactsPix"
        options={{ headerShown: false }}
        component={MeusContatos}
      />
      <Stack.Screen
        name="HomePagamentos"
        options={{ headerShown: false }}
        component={HomePagamentos}
      />
      <Stack.Screen
        name="scanBarCode"
        options={{ headerShown: false }}
        component={ScanCodeBar}
      />
      <Stack.Screen
        name="scanQrCodePix"
        options={{ headerShown: false }}
        component={ScanQrCodePix}
      />
      <Stack.Screen
        name="BarCodeDigit"
        options={{ headerShown: false }}
        component={BarCodeDigit}
      />
      <Stack.Screen
        name="ExtratoHome"
        options={{ headerShown: false }}
        component={ExtratoHome}
      />
    </Stack.Navigator>
  )
}
