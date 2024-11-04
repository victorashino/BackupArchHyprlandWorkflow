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
        width: 64,
        height: 18
    }
})

export default ModalButtonShape