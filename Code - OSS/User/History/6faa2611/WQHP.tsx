import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { colors } from '@/src/styles/global';

const BottomBar = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <FontAwesome6 name="house" size={24} color={colors.yellow} />
        {/* <FontAwesome style={styles.text} name="circle" size={8} color="#efefef" /> */}
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <FontAwesome6 name="pix" size={24} color={colors.primaryWhite} />
        {/* <FontAwesome style={styles.text} name="circle" size={8} color="#efefef" /> */}
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <FontAwesome6 name="credit-card" size={24} color={colors.primaryWhite} />
        {/* <FontAwesome style={styles.text} name="circle" size={8} color="#efefef" /> */}
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <FontAwesome6 name="circle-user" size={24} color={colors.primaryWhite} />
        {/* <FontAwesome style={styles.text} name="circle" size={8} color="#efefef" /> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 365,
    height: 78,
    alignSelf: "center",
    backgroundColor: colors.primaryBlue,
    borderRadius:24,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-around',
    marginBottom: 18
  },
  button: {
    alignItems: 'center',

  },
  text: {
    color: colors.primaryWhite,
    marginTop: 9,
    fontSize: 6,
  },
});

export default BottomBar;
