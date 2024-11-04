import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./style"
import { colors } from "@/src/styles/global"
import Row from "../../Row"
import { FontAwesome6 } from "@expo/vector-icons"

interface IButtonAppProps {
    text: string,
    submit: any,
    icon: string
}

const ButtonApp = ({ text, icon, submit }: IButtonAppProps) => {

    return (
        <View style={styles.container}>
            <Row>
                <FontAwesome6 name={icon} size={20} color={colors.primaryBlue} />
                <Text>{text}</Text>
            </Row>
        </View>
    )
}

export default ButtonApp