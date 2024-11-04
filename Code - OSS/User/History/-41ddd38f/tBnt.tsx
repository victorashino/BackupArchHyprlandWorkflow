import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface RowProps {
    children: React.ReactNode;
    style1?: ViewStyle;
}

const Row = ({ children, style1 }: RowProps) => {
    return (
        <View style={[styles.row, style1]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default Row;
