import { StyleProp, Text, View, ViewStyle } from "react-native";
import Line from "../Line";
import globalFonts from "@/src/styles/fonts";

// Definindo um componente funcional que aceita 'title' como prop
interface LineWithTextProps {
    title: string;
}

const LineWithText: React.FC<LineWithTextProps> = ({ title }) => {
    return (
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 10,
            marginHorizontal: "5%"
        }}>
            <Text style={globalFonts.regular16}>
                {title}
            </Text>
            <Line height={2} />
        </View>
    );
};

export default LineWithText;
