import formatedPrice from '@/src/utils/formatedPrice'
import React from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Line from '../Line'
import Row from '../Row'
import { FontAwesome6 } from '@expo/vector-icons'
import { colors } from '@/src/styles/global'
import { styles } from './style'

interface ItemProps {
  extract: {
    id: string
    method: string
    send: number
    name: string
    amount: number
    created: string
  }
}

export const ExtractItem: React.FC<ItemProps> = ({ extract }) => {
    const formatDate = (date: string) => {
      const [datePart, timePart] = date.split(' ');
      const [year, month, day] = datePart.split('-');
      return `${day}/${month}/${year}`;
    };

  const capitalizeFirstLetter = (input: string): string => {
    if (input.length === 0) {
      return input
    }
    return input.charAt(0).toUpperCase() + input.slice(1)
  }

  return (
    <View style={styles.container}>
        <Row marginTop={12} marginEnd={4} marginBottom={12} marginStart={4}>
        <Row>
            <View>
                <Row justify='flex-start'>
                    {extract.send === 0 ? (
                        <Row marginEnd={6}>
                            <FontAwesome6 name="angles-right" size={13} color="#008000"/>
                        </Row>
                        ) : (
                        <Row marginEnd={6}>
                            <FontAwesome6 name="angles-left" size={13} color="#008000"/>
                        </Row>
                    )}
                    <Text style={styles.bold}>
                        {capitalizeFirstLetter(extract.method)}{' '}
                        {extract.send === 0 ? 'Enviado' : 'Recebido'}
                    </Text>
                </Row>
                <Text
                    numberOfLines={1}
                    style={styles.normal}>
                        {extract.name}
                </Text>
            </View>
        </Row>
        <Row>
            <View style={{marginEnd: 16}}>
            <Text style={styles.date}>
                {formatDate(extract.created)}
            </Text>
            <Text style={styles.bold}>
                {extract.send === 0 && '-'} R$ {formatedPrice(String(extract.amount))}
            </Text>
            </View>
            <TouchableOpacity>
            <FontAwesome6 name="chevron-right" size={16} color={colors.yellow}/>
            </TouchableOpacity>
        </Row>
        </Row>
        <Line />
    </View>
    
  )
}