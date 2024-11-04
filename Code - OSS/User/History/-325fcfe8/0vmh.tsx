import React, { useState } from "react";
import { Text, TouchableOpacity, View, Modal, TouchableWithoutFeedback, ScrollView } from "react-native";
import { styles } from "./style"; // Ajuste o caminho conforme necessário
import { FontAwesome6 } from "@expo/vector-icons";
import { colors } from "@/src/styles/global";
import globalFonts from "@/src/styles/fonts";
import ButtonApp from "../../ButtonApp";

type OptionType = { value: number; label: string };

interface DropdownProps {
    title: string;
    label: string;
    options: OptionType[];
    value: string; // Valor atualmente selecionado
    setSelectedValue: (value: string) => void;
    required?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ title, label, options, value, setSelectedValue, required }) => {
    const [open, setOpen] = useState(false);

    const handleSelect = (option: OptionType) => {
        setSelectedValue(option.value.toString());
        setOpen(false);
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setOpen(true)} style={styles.containerDropdownApp}>
                <Text style={styles.label}>
                    {label}
                    {required && "*"}:
                </Text>
                <View style={styles.containerValue}>
                    <Text style={globalFonts.semiBold14}>
                        {options.find(option => option.value.toString() === value)?.label || "Selecione uma opção"}
                    </Text>
                    <FontAwesome6 name="chevron-down" size={11} color={colors.primaryBlue} />
                </View>
            </TouchableOpacity>

            <Modal transparent={true} visible={open} animationType="fade">
                <TouchableWithoutFeedback onPress={() => setOpen(false)}>
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.dropdown}>
                                <Text style={globalFonts.regular14Gray}>{title}:</Text>
                                <ScrollView style={styles.containerOptions}>
                                    {options.map((option) => (
                                        <TouchableOpacity
                                            key={option.value}
                                            style={{}}
                                            onPress={() => handleSelect(option)}
                                        >
                                            <Text style={globalFonts.regular14}>
                                                {option.label}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                                <ButtonApp color="blue" text="Confirmar" submit={() => setOpen(false)} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

export default Dropdown;
