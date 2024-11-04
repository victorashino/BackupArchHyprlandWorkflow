import React, { useState } from "react";
import { Text, TouchableOpacity, View, Modal, TouchableWithoutFeedback, ScrollView } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { colors } from "@/src/styles/global";
import globalFonts from "@/src/styles/fonts";
import { styles } from "./style";
import ButtonApp from "../../ButtonApp";

type OptionType = string | { value: string; label: string };

interface DropdownProps {
  title: string;
  label: string;
  options: OptionType[];
  value: string;
  setSelectedValue: (value: string) => void;
  required?: boolean;
}

const Checkbox = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) => {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onChange}>
      {checked ? (
        <FontAwesome6 name="square-check" size={23} color={colors.primaryBlue} solid />
      ) : (
        <View style={styles.checkbox} />
      )}
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const Dropdown: React.FC<DropdownProps> = ({ title, label, options, value, setSelectedValue, required }) => {
  const [open, setOpen] = useState(false);
  const [valueSelected, setValueSelected] = useState(value);

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
