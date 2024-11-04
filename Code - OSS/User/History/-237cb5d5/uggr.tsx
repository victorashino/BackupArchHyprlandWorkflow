import React, { useState, useEffect, useCallback } from "react";
import Dropdown from "../../DropDown";
import { useExtract } from "@/src/context/ExtractContext"; // Importando o contexto

const FilterStartDates: React.FC = () => {
  const { setStart, getDateDaysAgo } = useExtract(); // Obtendo setStart e getDateDaysAgo diretamente do contexto
  
  const startDateOptions = [
    { label: 'Últimos 7 dias', value: 7 },
    { label: 'Últimos 15 dias', value: 15 },
    { label: 'Últimos 30 dias', value: 30 },
    { label: 'Últimos 90 dias', value: 90 },
  ];

  const [selectedStartDays, setSelectedStartDays] = useState(7); // Inicialize com um valor padrão

  const handleStartChange = useCallback(() => {
    const newStartDate = getDateDaysAgo(selectedStartDays);
    setStart(newStartDate);
  }, [selectedStartDays, setStart, getDateDaysAgo]);

  useEffect(() => {
    handleStartChange();
  }, [selectedStartDays, handleStartChange]);

  return (
    <Dropdown
      title="Início"
      label="Data de início"
      required={false}
      options={startDateOptions}
      value={selectedStartDays}
      setSelectedValue={(value: number) => setSelectedStartDays(value)}
    />
  );
};

export default FilterStartDates;
