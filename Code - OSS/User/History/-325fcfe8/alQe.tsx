import { Text, TouchableOpacity, View, Modal, TouchableWithoutFeedback, ScrollView } from "react-native";
import { styles } from "./style";
import { FontAwesome6 } from "@expo/vector-icons";
import { colors } from "@/src/styles/global";
import globalFonts from "@/src/styles/fonts";
import { useState } from "react";
import ButtonApp from "../../ButtonApp";

type OptionType = string | { value: string | number; label: string };

const Checkbox = ({ label, checked, onChange }: any) => {
    return (
        <TouchableOpacity style={styles.checkboxContainer} onPress={onChange}>
            {checked ? (
                <FontAwesome6 name={"square-check"} size={23} color={colors.primaryBlue} solid />
            ) : (
                <View style={styles.checkbox} />
            )}
            <Text style={styles.checkboxLabel}>{label}</Text>
        </TouchableOpacity>
    );
};

const Dropdown = ({ title, label, options, value, setSelectedValue, required }: any) => {
    const [open, setOpen] = useState(false);
    const [valueSelected, setValueSelected] = useState<string | number>("");

    const handleSelect = (option: OptionType) => {
        const selectedValue = typeof option === 'string' ? option : option.value;
        setValueSelected(selectedValue);
    };

    const handleSubmit = () => {
        setSelectedValue(valueSelected);
        setOpen(false);
    };

    const getLabel = (option: OptionType) => (typeof option === 'string' ? option : option.label);

    return (
        <View>
            <TouchableOpacity onPress={() => setOpen(true)} style={styles.containerDropdownApp}>
                <Text style={styles.label}>
                    {label}
                    {required && "*"}:
                </Text>
                <View style={styles.containerValue}>
                    <Text style={globalFonts.semiBold14}>
                        {value || "Selecione uma opção"}
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
                                    {options.map((option: OptionType, index: number) => (
                                        <Checkbox 
                                            key={index}
                                            label={getLabel(option)}
                                            checked={valueSelected === (typeof option === 'string' ? option : option.value)}
                                            onChange={() => handleSelect(option)}
                                        />
                                    ))}
                                </ScrollView>
                                <ButtonApp color="blue" text="Confirmar" submit={handleSubmit} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

export default Dropdown;
