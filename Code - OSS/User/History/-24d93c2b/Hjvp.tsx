import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '@/src/styles/global';
import fonts from '@/src/styles/fonts';
import { FontAwesome6 } from '@expo/vector-icons';
import Row from '@/src/components/Row';
import { useExtract } from '@/src/context/ExtractContext'; // Importa o contexto

const TwoDatePickers: React.FC = () => {
    const { setStart, setEnd, getDateDaysAgo } = useExtract(); // Usa o contexto
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    // Função para calcular o número de dias desde hoje até a data selecionada
    const calculateDaysAgo = (date: Date): number => {
        const today = new Date();
        const timeDifference = today.getTime() - date.getTime();
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Converte para dias
    };

    const onStartDateChange = (event: any, selectedDate?: Date) => {
        setShowStartDatePicker(false);
        const currentDate = selectedDate || startDate;
        if (currentDate) {
            setStartDate(currentDate);
            const daysAgo = calculateDaysAgo(currentDate);
            setStart(getDateDaysAgo(daysAgo));
        }
    };

    const onEndDateChange = (event: any, selectedDate?: Date) => {
        setShowEndDatePicker(false);
        const currentDate = selectedDate || endDate;
        if (currentDate) {
            setEndDate(currentDate);
            const daysAgo = calculateDaysAgo(currentDate);
            if (daysAgo == 0) {
                setEnd(getDateDaysAgo(-2));
            } else {
                setEnd(getDateDaysAgo(daysAgo));
            }
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.datePickerContainer} 
                onPress={() => setShowStartDatePicker(true)}
            >
                <Text style={[styles.label, fonts.regular14Gray]}>De:</Text>
                <Row justify='center'>
                    {startDate && (
                        <Text style={[fonts.semiBold16, styles.date]}>
                            {startDate.toLocaleDateString()} {/* Exibe a data formatada */}
                        </Text>
                    )}
                    {showStartDatePicker && (
                        <DateTimePicker
                            value={startDate || new Date()}
                            mode="date"
                            display="default"
                            onChange={onStartDateChange}
                        />
                    )}
                    <View style={styles.icon}>
                        <FontAwesome6 name="calendar" size={20} color={colors.primaryBlue} />
                    </View>
                </Row>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.datePickerContainer} 
                onPress={() => setShowEndDatePicker(true)}
            >
                <Text style={[styles.label, fonts.regular14Gray]}>Até:</Text>
                <Row justify='center'>
                    {endDate && (
                        <Text style={[fonts.semiBold16, styles.date]}>
                            {endDate.toLocaleDateString()} {/* Exibe a data formatada */}
                        </Text>
                    )}
                    {showEndDatePicker && (
                        <DateTimePicker
                            value={endDate || new Date()}
                            mode="date"
                            display="default"
                            onChange={onEndDateChange}
                        />
                    )}
                    <View style={styles.icon}>
                        <FontAwesome6 name="calendar" size={20} color={colors.primaryBlue} />
                    </View>
                </Row>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 56,
        marginTop: 36,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 32,
    },
    datePickerContainer: {
        width: '46%',
        marginVertical: 10,
        height: 48,
        borderColor: colors.disableBtn,
        borderRadius: 6,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "flex-end"
    },
    icon: {
        marginEnd: 8
    },
    label: {
        backgroundColor: colors.primaryWhite,
        color: colors.disableBtn,
        paddingHorizontal: 10,
        position: "absolute",
        top: -12,
        left: 20,
        fontSize: 14,
    },
    date: {
        flex: 1,
        marginStart: 24,
        marginTop: 3
    }
});

export default TwoDatePickers;