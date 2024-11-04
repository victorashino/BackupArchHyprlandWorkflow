import { ReactNode } from "react";
import { styles } from "./style";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import Back from "../Back";
import { Href } from "expo-router";

type ContainerProps = {
    children: ReactNode;
    screenName?: Href;
};

const Container: React.FC<ContainerProps> = ({ children, screenName }) => {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Ajuste o offset conforme necessário
        >
            <ScrollView showsHorizontalScrollIndicator={true} contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.container}>
                    {screenName ? <Back screenName={screenName} /> : <Back />}
                    {children}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Container;