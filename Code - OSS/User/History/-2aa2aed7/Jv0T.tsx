import { StyleSheet, TouchableOpacity, View } from "react-native"
import Row from "./Row"


const Card = ({ children }) => {
    return (
        <TouchableOpacity style={ styles.container }>
            <Row>
                {children}
            </Row>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "96%",
        backgroundColor: "#FFF",
        borderRadius: 5,
        alignSelf: "center",
        alignItems: "center",
        padding: 10,
        paddingStart: 16
    }
})

export default Card