import { Text, TextInput, View } from "react-native";
import { styles } from "./style";
import { useEffect, useRef, useState } from "react";
import ButtonApp from "../ButtonApp";
import UserApi from "@/src/services/UserApi";
import globalFonts from "@/src/styles/fonts";
import { useAuth } from "@/src/context/AuthContext";
import { router } from "expo-router";
import UpdatePwd from "@/src/services/UpdatePwd";

const CheckCodeInvite = () => {
    const [values, setValues] = useState(Array(6).fill(""));
    const [btnDisable, setBtnDisable] = useState(true);
    const [code, setCode] = useState("");

    const { messageError, setMessageError, setRegister } = useAuth();

    const inputRefs: any = useRef([]);

    useEffect(() => {
        setCode(values.join(""));
    }, [values]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputRefs.current[0]) {
                inputRefs.current[0].focus();
            }
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async () => {
        try {
            await UpdatePwd.updatePwd(code)
                .then((res: any) => {
                    setRegister((prev) => ({
                        ...prev,
                        code: code,
                    }));
                    router.push("/(home)/profile");
                })
                .catch((error) => {
                    console.log(error.response.data);
                    setMessageError(error.response.data.error);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === "Backspace") {
            const newValues = [...values];

            newValues[index] = "";
            setValues(newValues);

            if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        } else if (index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleChange = (text: string, index: number) => {
        const newValues = [...values];
        newValues[index] = text.toUpperCase();
        setValues(newValues);

        const allFilled = newValues.every((value) => value.length > 0);
        setBtnDisable(!allFilled);
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerInput}>
                {values.map((value, index) => (
                    <TextInput
                        key={index}
                        style={messageError ? styles.inputError : styles.input}
                        maxLength={1}
                        value={value}
                        onChangeText={(text) => handleChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        keyboardType="default"
                        textAlign="center"
                        ref={(ref) => (inputRefs.current[index] = ref)}
                    />
                ))}
            </View>
            <View>
                <ButtonApp
                    text="Prosseguir"
                    color="blue"
                    submit={handleSubmit}
                    disable={btnDisable}
                />
                <Text
                    style={[
                        globalFonts.regular14Red,
                        { textAlign: "center", marginTop: 10, height: 20 },
                    ]}
                >
                    {messageError}
                </Text>
            </View>
        </View>
    );
};

export default CheckCodeInvite;
