import React, { useState, useCallback, useEffect } from "react";
import Dropdown from "../../DropDown";
import { useExtract } from "@/src/context/ExtractContext"; // Importando o contexto

interface FilterStartDatesProps {
    onSelect: (value: number) => void; // Adicionando a função de callback
}

const FilterStartDates: React.FC<FilterStartDatesProps> = ({ onSelect }) => {

    // Opções para o dropdown
    const startDateOptions = [
        { label: 'Últimos 7 dias', value: 7 },
        { label: 'Últimos 15 dias', value: 15 },
        { label: 'Últimos 30 dias', value: 30 },
        { label: 'Últimos 90 dias', value: 90 },
    ];

    const [selectedStartDays, setSelectedStartDays] = useState<number>(90);

    const handleStartChange = useCallback(() => {
        onSelect(selectedStartDays); // Chama a função de callback com o valor selecionado
    }, [selectedStartDays, onSelect]);

    // Atualiza o valor selecionado e chama a função de callback quando o valor muda
    useEffect(() => {
        handleStartChange();
    }, [selectedStartDays, handleStartChange]);

    return (
        <Dropdown
            title="Início"
            label="Data de início"
            required={false}
            options={startDateOptions}
            value={selectedStartDays.toString()}
            setSelectedValue={(value: string) => setSelectedStartDays(parseInt(value, 10))}
        />
    );
};

export default FilterStartDates;
