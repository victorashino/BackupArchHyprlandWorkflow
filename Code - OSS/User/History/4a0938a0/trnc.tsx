import { StyleProp, Text, View, ViewStyle } from "react-native";
import Line from "../Line";
import globalFonts from "@/src/styles/fonts";

const LineCloseAccount = (title: string, style: StyleProp<ViewStyle> = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
}) => {
    return (
        <View style={style}>
            <Text style={globalFonts.regular16}>
                {title}
            </Text>
            <Line height={2}/>
        </View>
    );
};

export default LineCloseAccount;