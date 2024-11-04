import { Text, TouchableOpacity, View, Modal, TouchableWithoutFeedback, ScrollView, Button, Pressable } from "react-native";
import { styles } from "./style";
import { FontAwesome6 } from "@expo/vector-icons";
import { colors } from "@/src/styles/global";
import globalFonts from "@/src/styles/fonts";
import { useState } from "react";
import ButtonApp from "../ButtonApp";

type OptionType = string | { value: string; label: string };

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

interface IPropsDropdown {
    title?: string
    label?: string
    options?: any[]
    value?: string
    setSelectedValue?: any,
    required?: boolean
    MessageOptionsEmpity?: string
}

const Dropdown = ({ title, label, options = [], value, setSelectedValue, required, MessageOptionsEmpity }: IPropsDropdown) => {
    const [open, setOpen] = useState(false);
    const [valueSelected, setValueSelected] = useState("");

    const handleSelect = (option: OptionType) => {
        const selectedValue = typeof option === 'string' ? option : option.value;
        setValueSelected(selectedValue);
        setSelectedValue(selectedValue);
    };

    const handleSubmit = () => {
        setSelectedValue(valueSelected);
        setOpen(false);
    };

    const getLabel = (option: OptionType) => (typeof option === 'string' ? option : option.label);

    const getSelectedLabel = () => {
        const selectedOption = options.find(option => 
            typeof option === 'string' ? option === value : option.value === value
        );
        return selectedOption ? getLabel(selectedOption) : selectedOption[1];
    };

    return (
        <View>
            <Pressable onPress={() => setOpen(true)} style={styles.containerDropdownApp}>
                <Text style={styles.label}>
                    {label}
                    {required && "*"}:
                </Text>
                <View style={styles.containerValue}>
                    <Text style={globalFonts.semiBold14}>
                        {getSelectedLabel()} {/* Exibe o label da opção selecionada */}
                    </Text>
                    <FontAwesome6 name="chevron-down" size={11} color={colors.primaryBlue} />
                </View>
            </Pressable >

            <Modal transparent={true} visible={open} animationType="fade">
                <TouchableWithoutFeedback onPress={() => setOpen(false)}>
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.dropdown}>
                                <Text style={globalFonts.regular14Gray}>{title}:</Text>
                                {
                                    options.length !== 0 ? (
                                        <ScrollView style={styles.containerOptions}>
                                            {
                                                options.map((option: OptionType, index: number) => (
                                                    <Checkbox
                                                        key={index}
                                                        label={getLabel(option)}
                                                        checked={valueSelected === (typeof option === 'string' ? option : option.value)}
                                                        onChange={() => handleSelect(option)}
                                                    />
                                                ))}
                                        </ScrollView>
                                    ) : (
                                        <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={[globalFonts.regular12Gray, { textAlign: "center", width: "80%" }]}>{MessageOptionsEmpity}</Text>
                                        </View>
                                    )
                                }
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
