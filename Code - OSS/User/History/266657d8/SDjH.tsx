import { SplashScreen, Stack, usePathname, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { DepositProvider } from "../context/DepositContext";
import { ExtractProvider } from "../context/ExtractContext";
import { CompanyProvider } from "../context/CompanyContext";
import ModalLogoutHome from "../components/modalLogoutHome";
import { AppState, StatusBar } from "react-native";
import { TransferProvider } from "../context/TransferContext";
import { HomeProvider } from "../context/HomeContext";
import { PixProvider } from "../context/PixContext";
import { PaymentProvider } from "../context/PaymentContext";

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
        <AuthProvider>
            <StatusBar barStyle="dark-content" />
            <SafeAreaProvider>
                <AppContent />
            </SafeAreaProvider>
        </AuthProvider>
    );
}

function AppContent() {
    const { isAuthenticated, resendOnBoarding, logout } = useAuth();
    const router = useRouter();

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
        if (nextAppState === "background") {
            // setTimeout(() => {
            //     logout()
            //     console.log("DESLOGOU");
            // }, 10000);
            console.log("DESLOGOU");
        } else if (nextAppState === "inactive") {
            console.log("DESLOGOU");
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
                                    <ModalLogoutHome />
                                </TransferProvider>
                            </CompanyProvider>
                        </DepositProvider>
                    </ExtractProvider>
                </PixProvider>
            </PaymentProvider>
        </HomeProvider>
    );
}
