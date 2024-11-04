import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface RowProps {
    children: React.ReactNode;
    style?: ViewStyle;
}

const Row = ({ children, marginTop = 0, marginEnd = 0, marginBottom = 0, marginStart = 0 }) => {
    return (
        <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: marginTop,
              marginEnd: marginEnd,
              marginBottom: marginBottom,
              marginStart: marginStart
            }}>
            {children}
        </View>
    );
};

const Line = () => {
  return (
    <View 
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#FFF",
        alignSelf: "center"
      }}
    />
  )
}

const Card = ({  }) => {

}

export default {
  Row,
  Line
};
