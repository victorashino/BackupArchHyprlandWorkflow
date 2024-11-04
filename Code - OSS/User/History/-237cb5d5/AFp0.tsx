import React, { useState, useEffect, useCallback } from "react";
import Dropdown from "../../DropDown";
import { useExtract } from "@/src/context/ExtractContext"; // Importando o contexto

const FilterStartDates: React.FC = () => {
  const { setStart, fetchExtractData } = useExtract(); // Obtendo setStart e fetchExtractData do contexto
  
  // Supondo que a função getDateDaysAgo esteja disponível no contexto ou definida localmente
  const getDateDaysAgo = (daysAgo: number): string => {
    const today = new Date();
    today.setDate(today.getDate() - daysAgo);
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const startDateOptions = [
    { label: 'Últimos 7 dias', value: 7 },
    { label: 'Últimos 15 dias', value: 15 },
    { label: 'Últimos 30 dias', value: 30 },
    { label: 'Últimos 90 dias', value: 90 },
  ];

  const [selectedStartDays, setSelectedStartDays] = useState(0); // Iniciar com "Hoje"

  const handleStartChange = useCallback(() => {
    const newStartDate = getDateDaysAgo(selectedStartDays); // Usando getDateDaysAgo para calcular o start
    setStart(newStartDate); // Alterar o valor de start no contexto
    fetchExtractData(); // Chamar a função de requisição
  }, [selectedStartDays, setStart, fetchExtractData]);

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
