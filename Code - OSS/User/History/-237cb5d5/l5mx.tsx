import React, { useState, useEffect, useCallback } from "react";
import Dropdown from "../../DropDown";
import { useExtract } from "@/src/context/ExtractContext"; // Importando o contexto

const FilterStartDates: React.FC = () => {
    const { setStart, getDateDaysAgo, start } = useExtract(); // Obtendo setStart, getDateDaysAgo e start do contexto

    // Opções para o dropdown
    const startDateOptions = [
        { label: 'Últimos 7 dias', value: 7 },
        { label: 'Últimos 15 dias', value: 15 },
        { label: 'Últimos 30 dias', value: 30 },
        { label: 'Últimos 90 dias', value: 90 },
    ];

    const [selectedStartDays, setSelectedStartDays] = useState<number>(90);

    const handleStartChange = useCallback((days: number) => {
        const newStartDate = getDateDaysAgo(days);
        setStart(newStartDate);
    }, [getDateDaysAgo, setStart]);

    useEffect(() => {
        // Atualiza o selectedStartDays se o start mudar no contexto
        const daysDifference = (new Date().getTime() - new Date(start).getTime()) / (1000 * 3600 * 24);
        setSelectedStartDays(Math.round(daysDifference));
    }, [start]);

    useEffect(() => {
        handleStartChange(selectedStartDays);
    }, [selectedStartDays, handleStartChange]);

    return (
        <Dropdown
            title="Início"
            label="Data de início"
            required={false}
            options={startDateOptions}
            value={selectedStartDays.toString()} // Passa o valor como string
            setSelectedValue={(value: string) => setSelectedStartDays(parseInt(value, 10))} // Converte de volta para número
        />
    );
};

export default FilterStartDates;
