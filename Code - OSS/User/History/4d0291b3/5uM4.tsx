import React from 'react';
import { View } from 'react-native';

const Line = ({marginTop = 0, marginBottom = 0}) => {
  return (
    <View 
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#FFF",
        alignSelf: "center",
        marginTop: marginTop,
        marginBottom: marginBottom
      }}
    />
  );
};

export default Line;
