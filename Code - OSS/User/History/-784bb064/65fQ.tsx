import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./style"
import { colors } from "@/src/styles/global"

interface IButtonAppProps {
    color: 'blue' | 'white' | 'yelow' | 'red',
    text: string,
    submit: any,
    disable?: boolean
}

const ButtonApp = ({ color, text, submit, disable }: IButtonAppProps) => {

    return (
        <View style={styles.container}>
            
        </View>
    )
}

export default ButtonApp