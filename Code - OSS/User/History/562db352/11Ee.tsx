import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./style"
import { useEffect, useState } from "react"
import { colors } from "@/src/styles/global"
import { FontAwesome6 } from "@expo/vector-icons"

interface IButtonAppProps {
    color: 'blue' | 'white' | 'yelow' | 'red',
    text: string,
    submit: any,
    disable?: boolean,
    icon?: string
}

const ButtonApp = ({ color, text, submit, disable, icon }: IButtonAppProps) => {

    const [loading, setLoading] = useState(false)
    const [btnDisable, setBtnDisable] = useState(false)

    const handleStyleButton = () => {
        if (btnDisable) {
            return styles.buttonContainerDisable
        } else {
            if (color === "blue") {
                return styles.buttonContainerBlue
            } else if (color === "red") {
                return styles.buttonContainerRed
            } else if (color === "white") {
                return styles.buttonContainerWhite
            } else {
                return styles.buttonContainerYellow
            }
        }
    }

    const handleStyleText = () => {
        if (color === "blue" || color === "red") {
            return styles.textButtonWhite
        } else {
            return styles.textButtonBlue
        }
    }

    const handleColorLoading = () => {
        if (btnDisable) {
            return colors.primaryWhite
        } else {
            if (color === "blue" || color === "red") {
                return colors.primaryWhite
            } else {
                return colors.primaryBlue
            }
        }
    }

    const handleSubmit = async () => {
        try {
            setBtnDisable(true)
            setLoading(true)
            await submit()
        } catch (error) {
            console.log("Erro: ", error)
        } finally {
            setLoading(false);
            setBtnDisable(false);
        }
    }

    useEffect(() => {
        if (disable) {
            setBtnDisable(true)
        } else {
            setBtnDisable(false)
        }
    }, [disable])

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={handleStyleButton()}
                onPress={handleSubmit}
                disabled={btnDisable}
            >
                {
                    loading ? (
                        <ActivityIndicator size={23} color={handleColorLoading()} />
                    ) : (
                        <View style={{flexDirection: "row"}}>
                            <View style={{}}>
                                <FontAwesome6 name={icon} size={20} color={colors.primaryWhite} />
                            </View>
                            <Text style={handleStyleText()}>
                                {text}
                            </Text>
                        </View>
                    )
                }
            </TouchableOpacity>
        </View>
    )
}

export default ButtonApp