import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./style"
import { colors } from "@/src/styles/global"
import fonts from "@/src/styles/fonts"
import Row from "../../Row"
import { FontAwesome6 } from "@expo/vector-icons"

interface IButtonAppProps {
    text: string,
    submit?: any,
    icon: string
}

const ButtonApp = ({ text, icon, submit }: IButtonAppProps) => {

    return (
        <TouchableOpacity onPress={submit} style={styles.container}>
            <Row>
                <FontAwesome6 name={icon} size={20} color={colors.primaryBlue} />
                <Text style={[styles.text, fonts.semiBold14]}>{text}</Text>
            </Row>
        </TouchableOpacity>
    )
}

export default ButtonApp