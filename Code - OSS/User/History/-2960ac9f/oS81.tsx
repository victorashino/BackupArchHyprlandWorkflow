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
        width: 96,
        height: 24,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
    }
})

export default ModalButtonShape