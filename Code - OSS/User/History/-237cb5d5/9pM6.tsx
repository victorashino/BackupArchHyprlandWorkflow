import React, { useState, useEffect, useCallback } from "react";
import Dropdown from "../../DropDown";
import { useExtract } from "@/src/context/ExtractContext";

const FilterStartDates: React.FC = () => {
    const { start, setStart, getDateDaysAgo } = useExtract();

    const startDateOptions = [
        { label: 'Últimos 7 dias', value: 7 },
        { label: 'Últimos 15 dias', value: 15 },
        { label: 'Últimos 30 dias', value: 30 },
        { label: 'Últimos 90 dias', value: 90 },
    ];

    // Obter o valor selecionado do Dropdown, assumindo que é um número
    const [selectedStartDays, setSelectedStartDays] = useState<number | null>(null);

    const handleStartChange = useCallback((days: number) => {
        const newStartDate = getDateDaysAgo(days);
        setStart(newStartDate);
    }, [getDateDaysAgo, setStart]);

    useEffect(() => {
        // Atualize a seleção do dropdown baseado na data de início atual
        if (start) {
            const days = new Date().getDate() - new Date(start).getDate();
            setSelectedStartDays(days);
        }
    }, [start]);

    useEffect(() => {
        // Atualiza a data de início quando a seleção muda
        if (selectedStartDays !== null) {
            handleStartChange(selectedStartDays);
        }
    }, [selectedStartDays, handleStartChange]);

    return (
        <Dropdown
            title="Início"
            label="Data de início"
            required={false}
            options={startDateOptions}
            value={selectedStartDays?.toString() ?? ''} // Passa o valor como string ou vazio se nulo
            setSelectedValue={(value: string) => setSelectedStartDays(parseInt(value, 10))}
        />
    );
};

export default FilterStartDates;
