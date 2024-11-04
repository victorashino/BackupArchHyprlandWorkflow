import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

interface DatePickerButtonProps {
  date: string;
  text: string;
  onPress: () => void;
  isFromButton?: boolean; // Nova propriedade para indicar se a data vem dos botões padrão
}

const DatePickerButton: React.FC<DatePickerButtonProps> = ({
  date,
  text,
  onPress,
  isFromButton = false, // Padrão para falso, ou seja, não vem dos botões padrão
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.container}>
      <View style={styles.view}>
        {!isFromButton && <Text style={styles.datePickerText}>{text}</Text>}
        {!isFromButton && <Text style={styles.datePickerText}>{date}</Text>}
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
