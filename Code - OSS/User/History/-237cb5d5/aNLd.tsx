import React, { useState, useEffect, useCallback } from "react";
import Dropdown from "../../DropDown";
import { useExtract } from "@/src/context/ExtractContext";

const FilterStartDates: React.FC = () => {
    const { setStartPersonalizado, setStartDefault, getDateDaysAgo } = useExtract();

    const startDateOptions = [
        { label: 'Últimos 7 dias', value: 7 },
        { label: 'Últimos 15 dias', value: 15 },
        { label: 'Últimos 30 dias', value: 30 },
        { label: 'Últimos 90 dias', value: 90 },
    ];

    const [selectedStartDays, setSelectedStartDays] = useState<number>(90);

    const handleStartChange = useCallback((days: number) => {
        const newStartDate = getDateDaysAgo(days);
        setStartDefault(newStartDate);
        setStartPersonalizado(null)
    }, [getDateDaysAgo, setStartDefault]);

    useEffect(() => {
        handleStartChange(selectedStartDays);
    }, []);

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
