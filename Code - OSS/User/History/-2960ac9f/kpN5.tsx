import { View } from "react-native"
import Row from "./Row"


const ModalButtonShape = ({ children, marginTop = 0, marginEnd = 0, marginBottom = 0, marginStart = 0 }) => {
    return (
        <View style={{
        backgroundColor: "#FFF",
        width: 92,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginTop: marginTop,
        marginEnd: marginEnd,
        marginBottom: marginBottom,
        marginStart: marginStart}}>
            <Row>
                {children}
            </Row>
        </View>
    )
}

export default ModalButtonShape