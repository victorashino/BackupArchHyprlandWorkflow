import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '@/src/styles/global';
import fonts from '@/src/styles/fonts';
import { FontAwesome6 } from '@expo/vector-icons';
import Row from '@/src/components/Row';
import { useExtract } from '@/src/context/ExtractContext';

const TwoDatePickers: React.FC = () => {
    const { startPersonalizado, setStartPersonalizado, setEnd } = useExtract();
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const formatDateForAPI = (date: Date | null) => {
        if (!date) return '';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const formatDateForDisplay = (date: Date | null) => {
        if (!date) return '';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const onStartDateChange = (event: any, selectedDate?: Date) => {
        setShowStartDatePicker(false);
        if (selectedDate) {
            setStartDate(selectedDate);
            setStartPersonalizado(formatDateForAPI(selectedDate));
        }
    };

    const onEndDateChange = (event: any, selectedDate?: Date) => {
        setShowEndDatePicker(false);
        if (selectedDate) {
            setEndDate(selectedDate);
            setEnd(formatDateForAPI(selectedDate));
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
                    <Text style={[fonts.semiBold16, styles.date]}>
                        {formatDateForDisplay(startDate)}
                    </Text>
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
                    <Text style={[fonts.semiBold16, styles.date]}>
                        {formatDateForDisplay(endDate)}
                    </Text>
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
