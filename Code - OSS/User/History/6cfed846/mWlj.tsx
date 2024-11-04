import { Link } from "expo-router"
import { StatusBar, Text, View } from "react-native"

const ForgotPassword = () => {
    return (
        <View style={{ marginTop: 300 }}>
            <StatusBar barStyle={"dark-content"} />
            <Text>Esqueci minha senha</Text>
            <Link href={"/"}>Voltar</Link>
        </View>
    )
}

export default ForgotPassword