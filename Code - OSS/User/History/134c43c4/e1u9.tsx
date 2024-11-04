import { ReactNode } from "react";
import { styles } from "./style";
import { View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import Back from "../Back";
import { Href, router } from "expo-router";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { colors } from "@/src/styles/global";

type ContainerProps = {
    children: ReactNode;
    screenName?: Href;
    isLoginScreen?: boolean
};

const Container: React.FC<ContainerProps> = ({ children, screenName, isLoginScreen = false }) => {

    const handlePressBack = () => {
        if (screenName) {
            router.push(screenName);
        } else if (isLoginScreen){
            
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Ajuste o offset conforme necessário
        >
            <ScrollView showsHorizontalScrollIndicator={true} contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={handlePressBack}
                        style={{ position: "absolute", right: 0 }}
                    >
                        <FontAwesome6 name={"chevron-left"} size={20} color={colors.disableBtn} />
                    </TouchableOpacity>
                    {children}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Container;