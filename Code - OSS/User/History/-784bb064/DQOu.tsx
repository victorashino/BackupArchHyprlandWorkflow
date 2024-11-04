import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./style"
import { colors } from "@/src/styles/global"

interface IButtonAppProps {
    text: string,
    submit: any,
    icon: string
}

const ButtonApp = ({ text, icon, submit }: IButtonAppProps) => {

    return (
        <View style={styles.container}>
            
        </View>
    )
}

export default ButtonApp