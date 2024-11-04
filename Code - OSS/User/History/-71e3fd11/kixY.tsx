import React, { Children } from 'react';
import { View } from 'react-native';


interface ColumnProps {
    children: any,
    marginTop?: number;
    marginEnd?: number;
    marginBottom?: number;
    marginStart?: number;
    paddingHorizontal?: number;
    paddingVertical?: number;
    justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
}

const Column: React.FC<ColumnProps> = ({ 
    children,
    marginTop = 0, 
    marginEnd = 0, 
    marginBottom = 0, 
    marginStart = 0, 
    paddingHorizontal = 0,
    paddingVertical = 0,
    justify = "flex-start"
    }) => {
    return (
        <View
            style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: justify,
                marginTop: marginTop,
                marginEnd: marginEnd,
                marginBottom: marginBottom,
                marginStart: marginStart,
                paddingHorizontal: paddingHorizontal,
                paddingVertical: paddingVertical
            }}
        >
            {children}
        </View>
    );
};

export default Column;

