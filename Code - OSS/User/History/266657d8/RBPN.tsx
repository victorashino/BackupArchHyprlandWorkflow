import { SplashScreen, Stack, usePathname, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { DepositProvider } from "../context/DepositContext";
import { ExtractProvider } from "../context/ExtractContext";
import { CompanyProvider } from "../context/CompanyContext";
import ModalLogoutHome from "../components/modalLogoutHome";
import { AppState, BackHandler, StatusBar } from "react-native";
import { TransferProvider } from "../context/TransferContext";
import { HomeProvider } from "../context/HomeContext";
import { PixProvider } from "../context/PixContext";
import * as Updates from "expo-updates";
import { PaymentProvider } from "../context/PaymentContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default function Layout() {
    const [fontsLoaded] = useFonts({
        "Poppins-Bold": require("../assets/fonts/poppins/Poppins-Bold.ttf"),
        "Poppins-Light": require("../assets/fonts/poppins/Poppins-Light.ttf"),
        "Poopins-Regular": require("../assets/fonts/poppins/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/poppins/Poppins-SemiBold.ttf"),
    });

    useEffect(() => {
        if (!fontsLoaded) {
            SplashScreen.preventAutoHideAsync();
        } else {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <GestureHandlerRootView>
        <AuthProvider>
            <ModalLogoutHome />
            <StatusBar barStyle="dark-content" />
            <SafeAreaProvider>
                <AppContent />
            </SafeAreaProvider>
        </AuthProvider>
        </GestureHandlerRootView>
    );
}

function AppContent() {
    const { isAuthenticated, resendOnBoarding, logout } = useAuth();
    const router = useRouter();

    //  TRecho de verificação de atualizações
    useEffect(() => {
        async function updateApp() {
            const { isAvailable } = await Updates.checkForUpdateAsync();
            if (isAvailable) {
                await Updates.fetchUpdateAsync();
                await Updates.reloadAsync();
            }
        }
        updateApp();
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            if (resendOnBoarding) {
                router.replace("/(home)/onBoarding");
            } else {
                router.replace("/(home)/homePage");
            }
        } else {
            router.replace("/");
        }
    }, [isAuthenticated, resendOnBoarding]);

    useEffect(() => {
        const subscription = AppState.addEventListener(
            "change",
            handleAppStateChange
        );

        return () => {
            subscription.remove();
        };
    }, []);

    const handleAppStateChange = (nextAppState: any) => {
        console.log(nextAppState)
        if (nextAppState === "background") {
            // setTimeout(() => {
            //     logout()
            //     console.log("O App ficou em backGround em mais de 30 segundos");
            // }, 30000);
        } else if (nextAppState === "inactive") {
            logout()
            console.log("O App foi fechado");
        } else if (nextAppState === "active") {
            console.log("O app está em primeiro plano novamente");
        }
    };

    return (
        <HomeProvider>
            <PaymentProvider>
                <PixProvider>
                    <ExtractProvider>
                        <DepositProvider>
                            <CompanyProvider>
                                <TransferProvider>
                                    <Stack screenOptions={{ headerShown: false }} />
                                </TransferProvider>
                            </CompanyProvider>
                        </DepositProvider>
                    </ExtractProvider>
                </PixProvider>
            </PaymentProvider>
        </HomeProvider>
    );
}
