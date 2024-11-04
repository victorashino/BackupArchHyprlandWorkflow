import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import ModalButtonShape from './ModalButtonShape';
import Row from './Row';
import Line from './Line';
import DatePickerButton from './DatePickerButton';
import DatePicker from 'react-native-modern-datepicker';
import styles from './modalFilterStyles';
import { format, subDays, isValid, parse } from 'date-fns';

interface ModalFilterProps {
  selectedDate: number | null;
  handleButtonPress: (buttonId: number) => void;
  selectedType: string | null;
  handleButtonTypePress: (buttonId: string) => void;
  onDateChange: (startDate: string, endDate: string) => void;
}

const ModalFilter: React.FC<ModalFilterProps> = ({
  selectedDate,
  handleButtonPress,
  selectedType,
  handleButtonTypePress,
  onDateChange,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [startDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [endDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [selectedDateButton, setSelectedDateButton] = useState<number | null>(null);
  const [isDatePickerSelected, setIsDatePickerSelected] = useState<boolean>(false);

  const formatarData = (data: Date | null): string => {
    if (!data) return '';

    return format(data, 'dd/MM/yyyy');
  };

  useEffect(() => {
    if (selectedDate !== null) {
      const today = new Date();
      const selectedStartDate = subDays(today, selectedDate);
      setStartDate(selectedStartDate);
      setEndDate(today);
      setSelectedDateButton(selectedDate);
    }
  }, [selectedDate]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openStartDatePicker = () => {
    setStartDatePickerVisible(true);
    setIsDatePickerSelected(true); // Indicar seleção do date picker
  };

  const closeStartDatePicker = () => {
    setStartDatePickerVisible(false);
  };

  const openEndDatePicker = () => {
    setEndDatePickerVisible(true);
    setIsDatePickerSelected(true); // Indicar seleção do date picker
  };

  const closeEndDatePicker = () => {
    setEndDatePickerVisible(false);
  };

  const handleStartDateChange = (date: string) => {
    try {
      const parsedDate = parse(date, 'yyyy/MM/dd', new Date());
      if (isValid(parsedDate)) {
        console.log('Data de início selecionada:', date);
        setStartDate(parsedDate);
        closeStartDatePicker();
        onDateChange(date, endDate ? formatarData(endDate) : '');
      } else {
        console.error('Data de início inválida:', date);
      }
    } catch (error) {
      console.error('Erro ao parsear data de início:', error);
    }
  };

  const handleEndDateChange = (date: string) => {
    try {
      const parsedDate = parse(date, 'yyyy/MM/dd', new Date());
      if (isValid(parsedDate)) {
        console.log('Data de término selecionada:', date);
        setEndDate(parsedDate);
        closeEndDatePicker();
        onDateChange(startDate ? formatarData(startDate) : '', date);
      } else {
        console.error('Data de término inválida:', date);
      }
    } catch (error) {
      console.error('Erro ao parsear data de término:', error);
    }
  };

  const handleButtonPressInternal = (buttonId: number) => {
    handleButtonPress(buttonId);
    setSelectedDateButton(buttonId);
    setIsDatePickerSelected(false); // Resetar flag de seleção do date picker
  };

  return (
    <View>
      <TouchableOpacity onPress={openModal}>
        <Text style={styles.button}>FILTRAR POR DATA</Text>
      </TouchableOpacity>

      {/* Modal de filtro por data */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Conteúdo do modal aqui */}
            <Row>
              <Text style={styles.title}>FILTRAR POR DATA</Text>
            </Row>

            <Text style={styles.text}>Selecione um período</Text>
            {/* Botões para seleção de período */}
            <Row marginTop={16}>
              <ModalButtonShape
                isSelected={selectedDateButton === 7}
                onPress={() => handleButtonPressInternal(7)}
              >
                <Text>7 dias</Text>
              </ModalButtonShape>
              <ModalButtonShape
                isSelected={selectedDateButton === 15}
                onPress={() => handleButtonPressInternal(15)}
              >
                <Text>15 dias</Text>
              </ModalButtonShape>
              <ModalButtonShape
                isSelected={selectedDateButton === 30}
                onPress={() => handleButtonPressInternal(30)}
              >
                <Text>30 dias</Text>
              </ModalButtonShape>
            </Row>

            {/* Mais opções de seleção de período */}
            <ModalButtonShape
              marginTop={12}
              marginBottom={12}
              isSelected={selectedDateButton === 90}
              onPress={() => handleButtonPressInternal(90)}
            >
              <Text>90 dias</Text>
            </ModalButtonShape>

            <Text style={styles.text}>ou</Text>

            {/* Botões para abrir o DatePicker */}
            <Row marginTop={8}>
              <DatePickerButton
                date={startDate ? formatarData(startDate) : ''}
                onPress={openStartDatePicker}
                text={'De'}
                isFromButton={!isDatePickerSelected} // Passar propriedade indicando origem dos botões padrão
              />
              <DatePickerButton
                date={endDate ? formatarData(endDate) : ''}
                onPress={openEndDatePicker}
                text={'Até'}
                isFromButton={!isDatePickerSelected} // Passar propriedade indicando origem dos botões padrão
              />
            </Row>

            <Line marginBottom={16} marginTop={38} />
            <Text style={styles.text}>Selecione um tipo de lançamento</Text>

            {/* Botões para seleção de tipo de lançamento */}
            <Row>
              <ModalButtonShape
                marginTop={16}
                marginBottom={32}
                isSelected={selectedType === 'in'}
                onPress={() => {
                  handleButtonTypePress('in');
                }}
              >
                <Text>Entradas</Text>
                <Row marginStart={6}>
                  <Image
                    style={styles.arrow}
                    source={require('@/assets/home/arrow-right-blue.png')}
                  />
                  <Image
                    style={styles.arrow}
                    source={require('@/assets/home/arrow-right-blue.png')}
                  />
                </Row>
              </ModalButtonShape>

              <ModalButtonShape
                marginTop={16}
                marginBottom={32}
                isSelected={selectedType === 'out'}
                onPress={() => {
                  handleButtonTypePress('out');
                }}
              >
                <Text>Saídas</Text>
                <Row marginStart={6}>
                  <Image
                    style={styles.arrow}
                    source={require('@/assets/home/arrow-left-blue.png')}
                  />
                  <Image
                    style={styles.arrow}
                    source={require('@/assets/home/arrow-left-blue.png')}
                  />
                </Row>
              </ModalButtonShape>
            </Row>
            <TouchableOpacity style={styles.btnFilter} onPress={closeModal}>
              <Text style={styles.textBtnFilter}>Filtrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal do DatePicker para data de início */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={startDatePickerVisible}
        onRequestClose={closeStartDatePicker}
      >
        <TouchableOpacity
          onPress={closeStartDatePicker}
          activeOpacity={1}
          style={styles.datePickerModal}
        >
          <View style={styles.datePickerModalContent}>
            <DatePicker mode="calendar" onDateChange={handleStartDateChange} />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal do DatePicker para data de término */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={endDatePickerVisible}
        onRequestClose={closeEndDatePicker}
      >
        <TouchableOpacity
          onPress={closeEndDatePicker}
          activeOpacity={1}
          style={styles.datePickerModal}
        >
          <View style={styles.datePickerModalContent}>
            <DatePicker mode="calendar" onDateChange={handleEndDateChange} />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ModalFilter;
