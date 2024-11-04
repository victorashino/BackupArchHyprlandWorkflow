import React, { useState, useCallback } from "react";
import Dropdown from "../../Extract/DropDown";
import { useExtract } from "@/src/context/ExtractContext";
import { Text, TouchableOpacity } from "react-native";

const FilterStartDates: React.FC = () => {
    const { setStartPersonalizado, setStartDefault, getDateDaysAgo } = useExtract();

    const startDateOptions = [
        { label: 'Últimos 7 dias', value: 7 },
        { label: 'Últimos 15 dias', value: 15 },
        { label: 'Últimos 30 dias', value: 30 },
        { label: 'Últimos 90 dias', value: 90 },
    ];

    const [selectedStartDays, setSelectedStartDays] = useState<number>(90);
    const [temporaryStart, setTemporaryStart] = useState<string | null>(null);

    const handleStartChange = useCallback((days: number) => {
        const newStartDate = getDateDaysAgo(days);
        setTemporaryStart(newStartDate);
    }, [getDateDaysAgo]);

    const applyStartDate = useCallback(() => {
        if (temporaryStart !== null) {
            setStartDefault(temporaryStart);
            setStartPersonalizado(null);
        }
    }, [temporaryStart, setStartDefault, setStartPersonalizado]);

    return (
        <>
            <Dropdown
                title="Início"
                label="Período de"
                required={false}
                options={startDateOptions}
                value={selectedStartDays.toString()}
                setSelectedValue={(value: string) => {
                    setSelectedStartDays(parseInt(value, 10));
                    handleStartChange(parseInt(value, 10));
                }}
            />
            <TouchableOpacity onPress={applyStartDate}>
                <Text style={{ color: 'white' }}>Aplicar Data de Início</Text>
            </TouchableOpacity>
        </>
    );
};

export default FilterStartDates;
