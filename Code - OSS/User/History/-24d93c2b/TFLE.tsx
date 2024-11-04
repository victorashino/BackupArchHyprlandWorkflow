import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '@/src/styles/global';
import fonts from '@/src/styles/fonts';
import { FontAwesome6 } from '@expo/vector-icons';
import Row from '@/src/components/Row';
import { useExtract } from '@/src/context/ExtractContext'; // Importando o contexto

interface TwoDatePickersProps {
    onDateChange: (start: string | null, end: string | null, type: string) => void;
    isDropdownDisabled: boolean;
    setDropdownDisabled: (disabled: boolean) => void;
}

const TwoDatePickers: React.FC<TwoDatePickersProps> = ({ onDateChange }) => {
    const { setStart, setEnd, setDefault } = useExtract(); // Obtendo funções do contexto

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const formatDate = (date: Date | null) => {
        if (!date) return '';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`; // Formato ISO para start e end
    };

    const onStartDateChange = (event: any, selectedDate?: Date) => {
        setShowStartDatePicker(false);
        const currentDate = selectedDate || startDate;
        if (currentDate) {
            setStartDate(currentDate);
        }
    };

    const onEndDateChange = (event: any, selectedDate?: Date) => {
        setShowEndDatePicker(false);
        const currentDate = selectedDate || endDate;
        if (currentDate) {
            setEndDate(currentDate);
        }
    };

    useEffect(() => {
        onDateChange(formatDate(startDate), formatDate(endDate), "range");
    }, [startDate, endDate]);

    const handleFilterApply = () => {
        setStart(formatDate(startDate));
        setEnd(formatDate(endDate));
        setDefault(); // Resetar para valores padrão
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
                        <Text style={[fonts.semiBold16, styles.date]}>{formatDate(startDate)}</Text>
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
                        <Text style={[fonts.semiBold16, styles.date]}>{formatDate(endDate)}</Text>
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
            <TouchableOpacity
                onPress={handleFilterApply}
                style={styles.applyButton}
            >
                <Text style={styles.applyButtonText}>Aplicar Filtro</Text>
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
    },
    applyButton: {
        marginTop: 16,
        padding: 12,
        backgroundColor: colors.primaryBlue,
        borderRadius: 6,
        alignItems: 'center',
    },
    applyButtonText: {
        color: colors.primaryWhite,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TwoDatePickers;
