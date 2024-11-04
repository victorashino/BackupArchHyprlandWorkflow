import React from 'react';
import { View, ViewStyle } from 'react-native';

interface RowProps {
    children: any,
    marginTop?: number;
    marginEnd?: number;
    marginBottom?: number;
    marginStart?: number;
    justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    align?: 'center' | 'baseline' | 'flex-end' | 'flex-start' | 'stretch';
}

const Row: React.FC<RowProps> = ({ 
    children, 
    marginTop = 0, 
    marginEnd = 0, 
    marginBottom = 0, 
    marginStart = 0, 
    justify = 'space-between', 
    align = "center" }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: align,
                justifyContent: justify,
                marginTop: marginTop,
                marginEnd: marginEnd,
                marginBottom: marginBottom,
                marginStart: marginStart,
            }}
        >
            {children}
        </View>
    );
};

export default Row;
