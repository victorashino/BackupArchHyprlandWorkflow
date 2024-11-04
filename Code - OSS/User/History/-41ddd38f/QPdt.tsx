import React from 'react';
import { View } from 'react-native';

interface RowProps {
    children: any,
    marginTop?: number;
    marginEnd?: number;
    marginBottom?: number;
    marginStart?: number;
    justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
}

const Row: React.FC<RowProps> = ({ children, marginTop = 0, marginEnd = 0, marginBottom = 0, marginStart = 0, justify = 'space-between' }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: justify,
                marginTop: marginTop,
                marginEnd: marginEnd,
                marginBottom: marginBottom,
                marginStart: marginStart,
                backgroundColor: "#000"
            }}
        >
            {children}
        </View>
    );
};

export default Row;
