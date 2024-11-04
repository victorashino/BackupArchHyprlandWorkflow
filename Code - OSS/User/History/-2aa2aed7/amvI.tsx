import { StyleSheet, View } from "react-native"
import Row from "./Row"


const Card = ({ children }) => {
    return (
        <View style={ styles.container }>
            <Row>
                {children}
            </Row>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        height: 40,
        backgroundColor: "#FFF",
        borderRadius: 5,
        alignSelf: "center",
        marginTop: 16,
        marginBottom: 8,
        justifyContent: "center",
        alignItems: "center",
        paddingStart: 16
    }
})

export default Card