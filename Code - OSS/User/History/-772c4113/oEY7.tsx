import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

interface DatePickerButtonProps {
  date: string;
  text: string;
  onPress: () => void;
  showDateText: boolean; // Propriedade para controlar a visibilidade do texto da data
}

const DatePickerButton: React.FC<DatePickerButtonProps> = ({
  date,
  text,
  onPress,
  showDateText,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.container}>
      <View style={styles.view}>
        <Text style={styles.datePickerText}>{text}</Text>
        {showDateText && <Text style={styles.datePickerText}>{date}</Text>}
        <Image
          style={styles.image}
          source={require('@/assets/home/extrato/calendario_white.png')}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingEnd: 4,
    borderWidth: 1,
    borderEndColor: 'rgba(0, 0, 0, 0.0)',
    borderStartColor: 'rgba(0, 0, 0, 0.0)',
    borderBlockEndColor: 'rgba(255, 255, 255, 1.0)',
    borderBlockStartColor: 'rgba(0, 0, 0, 0.0)',
    width: '45%',
  },
  image: {
    marginBottom: 3,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  datePickerText: {
    color: '#FFF',
    fontSize: 16,
    alignSelf: 'flex-end',
  },
});

export default DatePickerButton;
