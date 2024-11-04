import { TouchableOpacity } from "react-native"
import Row from "./Row"

interface CardProps {
    children: any,
    marginTop?: number;
    marginBottom?: number;
    onPress?: any
}

const Card: React.FC<CardProps> = ({ children, marginTop = 0, marginBottom = 0, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{
            flexDirection: "row",
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