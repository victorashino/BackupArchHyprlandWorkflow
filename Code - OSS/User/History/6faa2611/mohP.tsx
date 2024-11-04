import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { colors } from '@/src/styles/global';

const BottomBar = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <FontAwesome6 name="house" size={24} color={colors.primaryWhite} />
        <FontAwesome style={styles.text} name="circle" size={8} color="#efefef" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <FontAwesome6 name="pix" size={24} color={colors.primaryWhite} />
        <FontAwesome style={styles.text} name="circle" size={8} color="#efefef" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <FontAwesome6 name="credit-card" size={24} color={colors.primaryWhite} />
        <FontAwesome style={styles.text} name="circle" size={8} color="#efefef" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <FontAwesome6 name="circle-user" size={24} color={colors.primaryWhite} />
        <FontAwesome style={styles.text} name="circle" size={8} color="#efefef" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 365,
    alignSelf: "center",
    backgroundColor: colors.primaryBlue,
    borderRadius:24,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 25,
    alignContent: "space-between"
  },
  button: {
    alignItems: 'center',
  },
  text: {
    color: colors.yellow,
    marginTop: 5,
    fontSize: 6,
  },
});

export default BottomBar;
