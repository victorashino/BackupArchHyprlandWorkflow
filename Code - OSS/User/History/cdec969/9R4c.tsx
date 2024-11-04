import { Link } from "expo-router"
import { StatusBar, Text, View } from "react-native"

const Help = () => {
    return (
        <View style={{ marginTop: 300 }}>
            <StatusBar barStyle={"dark-content"} />
            <Text>Supporte</Text>
            <Link href={"/"}>Voltar</Link>
        </View>
    )
}

export default Help