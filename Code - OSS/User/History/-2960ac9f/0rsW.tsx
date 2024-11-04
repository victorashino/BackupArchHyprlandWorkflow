import { StyleSheet, View } from "react-native"
import Row from "./Row"


const ModalButtonShape = ({children}) => {
    return (
        <View style={styles.container}>
            <Row>
                {children}
            </Row>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        width: 92,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    }
})

export default ModalButtonShape