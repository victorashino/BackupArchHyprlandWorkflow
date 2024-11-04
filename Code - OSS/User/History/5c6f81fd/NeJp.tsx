import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './style';
import { FontAwesome6 } from '@expo/vector-icons';
import { colors } from '@/src/styles/global';

const DropdownWithText: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);  // Alterna entre mostrar/ocultar o texto
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
        <Text style={styles.dropdownText}>Click to reveal more info</Text>
        <FontAwesome6 name="x" size={20} color={colors.primaryBlue} />
      </TouchableOpacity>

      {isOpen && (
        <Text style={styles.revealedText}>
          This is the text that appears when you click the dropdown.
        </Text>
      )}
    </View>
  );
};

export default DropdownWithText;