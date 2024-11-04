import React from 'react';
import { View, Text } from 'react-native';
import Dropdown from '../DropDown'; // Ajuste o caminho conforme necessário
import { useExtract } from '@/src/context/ExtractContext'; // Ajuste o caminho conforme necessário

const FilterComponent: React.FC = () => {
  const { start, setStart } = useExtract(); // Obtém a função setStart do contexto

  // Opções para o dropdown
  const startDateOptions = [
    { label: 'Últimos 7 dias', value: 7 },
    { label: 'Últimos 15 dias', value: 15 },
    { label: 'Últimos 30 dias', value: 30 },
    { label: 'Últimos 90 dias', value: 90 },
  ];

  return (
    <View>
      <Dropdown
        title="Selecionar Período"
        label="Período de Início"
        options={startDateOptions}
        value={start} // Valor atual, obtido do contexto
        setSelectedValue={setStart} // Função para atualizar o valor
      />
    </View>
  );
};

export default FilterComponent;
