import { FontAwesome } from "@expo/vector-icons"
import { Text } from "react-native"
import { View, } from "react-native"
import { style } from "./style"


export default function AreaCard() {
    return (
        <View style={style.container}>
            <View>
                <FontAwesome />
            </View>
            <Text></Text>
        </View>
    )
}