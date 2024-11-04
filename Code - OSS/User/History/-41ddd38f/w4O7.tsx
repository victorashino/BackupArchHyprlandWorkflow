import React from 'react';
import { View } from 'react-native';

const Row = ({ children, marginTop = 0, marginEnd = 0, marginBottom = 0, marginStart = 0 }) => {
    return (
        <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: marginTop,
              marginEnd: marginEnd,
              marginBottom: marginBottom,
              marginStart: marginStart
            }}>
            {children}
        </View>
    );
};

export default Row;
