import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface RowProps {
    children: React.ReactNode;
    style?: ViewStyle;
}

const Row = ({ children, style }: RowProps) => {
    return (
        <View style={[styles.row, style]}>
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
