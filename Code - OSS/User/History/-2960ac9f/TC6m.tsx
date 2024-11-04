import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Row from './Row';

const ModalButtonShape = ({ children, marginTop = 0, marginEnd = 0, marginBottom = 0, marginStart = 0, isSelected, onPress }) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    marginTop: marginTop,
                    marginEnd: marginEnd,
                    marginBottom: marginBottom,
                    marginStart: marginStart
                },
                isSelected && styles.selectedButton
            ]}
            onPress={onPress}
        >
            <Row>
                {children}
            </Row>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFF",
    width: 92,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: "#D3D3D3",
  },
});

export default ModalButtonShape;
