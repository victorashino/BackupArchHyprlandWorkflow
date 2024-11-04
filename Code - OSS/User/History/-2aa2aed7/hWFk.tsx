import { StyleSheet, TouchableOpacity, View } from "react-native"
import Row from "./Row"


const Card = ({ children, marginTop = 0, marginBottom = 0 }) => {
    return (
        <TouchableOpacity style={{
            flexDirection: "row",
            width: "96%",
            backgroundColor: "#FFF",
            borderRadius: 5,
            alignSelf: "center",
            marginTop: marginTop,
            marginBottom: marginBottom,
            alignItems: "center",
            padding: 10,
            paddingStart: 16
        }}>
            <Row>
                {children}
            </Row>
        </TouchableOpacity>
    )
}

export default Card