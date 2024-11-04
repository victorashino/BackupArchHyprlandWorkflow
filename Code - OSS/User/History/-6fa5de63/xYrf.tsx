import formatedPrice from './formatedPrice'
import React from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Line from '../Line'
import Row from '../Row'

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
    <View style={{marginBottom: 8}}>
        <Row marginTop={12} marginEnd={4} marginBottom={12} marginStart={4}>
        <Row>
            <View>
                <Row justify='flex-start'>
                    {extract.send === 0 ? (
                        <Row marginEnd={6}>
                            <Image source={require('@/assets/home/arrow-left.png')}/>
                            <Image source={require('@/assets/home/arrow-left.png')}/>
                        </Row>
                        ) : (
                        <Row marginEnd={6}>
                            <Image source={require('@/assets/home/arrow-right.png')}/>
                            <Image source={require('@/assets/home/arrow-right.png')}/>
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
            <Image source={require('@/assets/home/pdf.png')} />
            </TouchableOpacity>
        </Row>
        </Row>
        <Line/>
    </View>
    
  )
}

const styles = StyleSheet.create({
    bold: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#FFF"
    },
    normal: {
        fontWeight: "normal",
        fontSize: 12,
        color: "#FFF",
        marginStart: 20,
    },
    date: {
        fontWeight: "normal",
        fontSize: 12,
        color: "#FFF",
        alignSelf: "flex-end"
    }
})