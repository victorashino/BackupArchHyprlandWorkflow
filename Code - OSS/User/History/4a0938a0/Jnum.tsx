import { StyleProp, Text, View, ViewStyle } from "react-native";
import Line from "../Line";
import globalFonts from "@/src/styles/fonts";

const LineWithText = (title: string) => {
    return (
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 10,
        }}>
            <Text style={globalFonts.regular16}>
                {title}
            </Text>
            <Line height={2}/>
        </View>
    );
};

export default LineWithText;