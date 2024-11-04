import { FontAwesome } from "@expo/vector-icons"
import { Text } from "react-native"
import { View, } from "react-native"
import { style } from "./style"


export default function AreaCard(name: any) {
    return (
        <View style={style.container}>
            <View style={style.iconContainer}>
                <FontAwesome />
            </View>
            <Text>{name}</Text>
        </View>
    )
}