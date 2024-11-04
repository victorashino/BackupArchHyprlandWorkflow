import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, Modal, TouchableWithoutFeedback, ScrollView } from "react-native";
import { styles } from "./style";
import { FontAwesome6 } from "@expo/vector-icons";
import fonts from '@/src/styles/fonts';
import globalFonts from "@/src/styles/fonts";
import ButtonApp from "../../ButtonApp";
import { colors } from "@/src/styles/global";

type OptionType = { value: number; label: string };

interface DropdownProps {
    label: string;
    options: OptionType[];
    value: string; 
    setSelectedValue: (value: string) => void;
    applyStartDate: () => void; // Adicionado
    required?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, value, setSelectedValue, applyStartDate, required }) => {
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(options.find(option => option.value.toString() === value) || null);

    useEffect(() => {
        setSelectedOption(options.find(option => option.value.toString() === value) || null);
    }, [value, options]);

    const handleSelect = (option: OptionType) => {
        setSelectedValue(option.value.toString());
        setSelectedOption(option);
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
                        {selectedOption ? selectedOption.label : "Selecione uma opção"}
                    </Text>
                    <FontAwesome6 name="chevron-down" size={11} color={colors.primaryBlue} />
                </View>
            </TouchableOpacity>

            <Modal transparent={true} visible={open} animationType="fade">
                <TouchableWithoutFeedback onPress={() => setOpen(false)}>
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.dropdown}>
                                <ScrollView style={styles.containerOptions}>
                                    {options.map((option) => (
                                        <TouchableOpacity
                                            key={option.value}
                                            style={[
                                                {},
                                                selectedOption?.value === option.value && styles.containerOptions
                                            ]}
                                            onPress={() => {handleSelect(option)}}
                                        >
                                            <Text style={fonts.semiBold16}>
                                                {option.label}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                                <ButtonApp
                                    color="blue"
                                    text="Selecionar"
                                    submit={applyStartDate}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

export default Dropdown;
