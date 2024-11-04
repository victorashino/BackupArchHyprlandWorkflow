import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import Line from "../Line";
import globalFonts from "@/src/styles/fonts";
import { colors } from "@/src/styles/global";

// Definindo um componente funcional que aceita 'title' como prop
interface LineWithTextProps {
    title: string;
}

const LineWithText: React.FC<LineWithTextProps> = ({ title }) => {
    return (
        <View style={styles.container}>
          <Text style={[globalFonts.regular14, styles.dateText]}>{title}</Text>
          <View style={styles.lineContainer}>
            <View style={styles.line} />
          </View>
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 16,
      marginStart: 42,
      width: 335,
    },
    dateText: {
      color: colors.gray,
    },
    lineContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    line: {
      height: 2,
      backgroundColor: colors.gray,
      marginStart: 7
    },
  });
  

export default LineWithText;
